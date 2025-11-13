---
title: "Cargo Plumbing Commands"
publishedAt: "2025-09-06"
tags: ["gsoc", "gsoc-2025"]
slug: "gsoc-cargo-plumbing-commands"
show: false
---

This project, undertaken during GSoC 2025, involved the initial implementation of a prototype for Cargo plumbing commands. These plumbing commands are low-level, composable tools designed to expose core Cargo functionalities, such as manifest parsing, dependency resolution, and feature selection, as distinct, scriptable steps.

The project was developed as a third-party Cargo subcommand under a different repository than cargo itself. It is over at https://github.com/crate-ci/cargo-plumbing.

## The Plumbing Commands Themselves

The core plumbing command implementation is available at crates.io under [`cargo-plumbing`](https://crates.io/crates/cargo-plumbing). We also have another crate published for the schemas, [`cargo-plumbing-schemas`](https://crates.io/crates/cargo-plumbing-schemas).

All plumbing commands communicate with each other via `stdin` and `stdout` using a stream of newline-delimited JSON objects (jsonlines). These input/output messages are defined in the schemas crate, `cargo-plumbing-schemas`.

There are ideas for more helper crates, i.e. helpers for consuming the messages and outputting the messages, but we're holding that off until we get user feedbacks. Fore more, see [crate-ci/cargo-plumbing#88](https://github.com/crate-ci/cargo-plumbing/issues/88).

As of time of writing, there are six plumbing commands implemented, `locate-manifest`, `read-manifest`, `read-lockfile`, `lock-dependencies`, `write-lockfile`, `resolve-features`. Details about each of the plumbing commands are as follows.

---

### `locate-manifest`

#### Overview
This command identifies the canonical path to a project's `Cargo.toml` file. This command serves as the typical entry point for any workflow. It mimics Cargo's manifest locating mechanism, performing an upward search from until a manifest is found.

#### Cli Arguments
- `--manifest-path`: (Optional) Specifies the exact path to the `Cargo.toml` file or the directory where the upward search should begin. If omitted, the search starts from the current working directory.

#### Output Messages
- `ManifestLocation`: A message containing the path to the manifest.

---

### `read-manifest`

#### Overview
This command reads manifests file (Cargo.toml) from disk and outputs them into a normalized version. An interesting case happens when reading workspace members' manifests, the workspace manifest is also outputted. The reason behind this behaviour is Cargo's own behaviour of also reading the workspace manifest. This is because of Cargo's workspace inheritance feature.

#### CLI Arguments
- `--manifest-path`: Specifies the exact path to the `Cargo.toml` file. Failing to provide a valid `Cargo.toml` file results in an error.
- `--workspace`: Specifies whether or not it should output all workspace members' manifests. The default value is false.

#### Output Messages
- `Manifest`: A message containing the information for the manifest, including the path, the normalized manifest format, package id, and a boolean  marker if the manifest is a workspace manifest.

---

### `read-lockfile`

#### Overview
This command reads a lock file (Cargo.lock) from disk and output them using a format separate from cargo's lockfile versioning. The challenging thing when implementing this command, or any lockfile-related commands for that matter, is handling older versions of lockfiles. In short, there are four lockfile versions within Cargo, with each having their separate changees. We haven't tested old lockfile handling that much.

#### **CLI Arguments**:
- `--lockfile-path`: Specifies the exact path to the `Cargo.lock` file to read from. This value only accepts a file with name `Cargo.lock` (See [crate-ci/cargo-plumbing#63](https://github.com/crate-ci/cargo-plumbing/issues/63)).

#### Output Messages
- `Lockfile`: A message containing the original lockfile version from the lock file on disk.
- `LockedPackage`: Each `[[package]]` entries in the lock file.
- `UnusedPatches`: `[[patch.unused]]` entry in the lock file.

---

### `lock-dependencies`

#### Overview
This command performs dependency resolution. This is the core command that computes the full dependency graph for a project. 

An interesting thing of Cargo's dependency resolution mechanism is that it can accept a previous resolve result as an input. Hence why this command accepts the output of `read-lockfile` as input. Not providing this command the previous resolve result will have the same behaviour as running `cargo build` for the first time when the `Cargo.lock` file hasn't been generated.

#### CLI Arguments
- `--manifest-path`: (Optional, Hack) Specifies the exact path to the `Cargo.toml` file. By default, it will use the `Cargo.toml` file in the current working directory. This is considered a hack since we're reading manifests files instead of consuming them through stdin (See [crate-ci/cargo-plumbing#36](https://github.com/crate-ci/cargo-plumbing/issues/36)).

#### Input Messages

The input messages for this command is practically the same as the output of `read-lockfile`. There are discussions of removing the `Lockfile` input message as it is irrelevant. For more, see [crate-ci/cargo-plumbing#99](https://github.com/crate-ci/cargo-plumbing/issues/99).

- `Lockfile`: A message containing the original lockfile version from the lock file on disk.
- `LockedPackage`: Each `[[package]]` entries in the lock file.
- `UnusedPatches`: `[[patch.unused]]` entry in the lock file.

#### Output Messages

The output messages for `lock-dependencies` is the same as the output for `read-lockfile` as both commands does the same thing of outputting a dependency resolve result.

- `Lockfile`: A message containing the original lockfile version from the lock file on disk.
- `LockedPackage`: Each `[[package]]` entries in the lock file.
- `UnusedPatches`: `[[patch.unused]]` entry in the lock file.

---

### `write-lockfile`

#### Overview
This command is the inverse of `read-lockfile`. It serializes a resolved dependency graph from its JSON representation into the standard Cargo.lock file format.

#### CLI Arguments
- `--lockfile-path`: Specifies the exact path to the `Cargo.lock` file to write to. This value only accepts a file with name `Cargo.lock` (See [crate-ci/cargo-plumbing#63](https://github.com/crate-ci/cargo-plumbing/issues/63)).

#### Input Messages

The input messages specifies the dependency resolve results either from `read-lockfile`, `lock-dependencies`, or other implementation that adheres to the schema contracts.

- `Lockfile`: A message containing the original lockfile version from the lock file on disk.
- `LockedPackage`: Each `[[package]]` entries in the lock file.
- `UnusedPatches`: `[[patch.unused]]` entry in the lock file.

#### Output

The output of this command is the written lock file to the path provided by `--lockfile-path`.

---

### `resolve-features`

#### Overview
This command computes the set of enabled features for every crate in the dependency graph. To resolve a feature set, we need the dependency resolve result.

#### CLI Arguments
- `--manifest-path`: (Optional, Hack) Specifies the exact path to the `Cargo.toml` file. By default, it will use the `Cargo.toml` file in the current working directory. This is considered a hack since we're reading manifests files instead of consuming them through stdin (See [crate-ci/cargo-plumbing#36](https://github.com/crate-ci/cargo-plumbing/issues/36)).
- `--features`, `--all-features`, `--no-default-features`: Specifies the set of features to use when resolving.
- `--dev-units`: (Optional, Hack) Specifies to include dev units or not. This is a hack since, ideally, this should be done by editing the input. Due to cargo's API limitations, this workaround is necessary.
- `--target`: Specifies the target for the features.

#### Input Messages

The input messages for `resolve-features` is the combination of output messages from `lock-dependencies` (or `read-lockfile`) and `read-manifest`. The `read-manifest` output is needed for the feature resolution side of things from Cargo.

- `Manifest`: A message containing the package ID spec for each of the manifests in the workspace.
- `Lockfile`: A message containing the original lockfile version from the lock file on disk.
- `LockedPackage`: Each `[[package]]` entries in the lock file.
- `UnusedPatches`: `[[patch.unused]]` entry in the lock file.

#### Output Messages

- `Activated`: A message containing the package ID spec of each crates, its set of activated features, and for which target the feature is activated for. 

## Future Work

The next plumbing command, `plan-build` is a work in progress. I have a PR open for it that I still am working on as the time of writing. The PR is over at https://github.com/crate-ci/cargo-plumbing/pull/96.

More work needs to be done to the plumbing commands and also cargo itself. Some plumbing command implementations are hacks and workarounds due to cargo's current limitation, which calls for some refactoring from cargo's side.

Some of the commands still have unresolved questions and have lots of aspects to improve upon. They are tracked by the following issues. Note that this also tracks unfinished features and commands.

- https://github.com/crate-ci/cargo-plumbing/issues/36
- https://github.com/crate-ci/cargo-plumbing/issues/37
- https://github.com/crate-ci/cargo-plumbing/issues/38
- https://github.com/crate-ci/cargo-plumbing/issues/39
- https://github.com/crate-ci/cargo-plumbing/issues/40

## Thank You

I would like to thank the Rust project and Google Summer of Code to have given me this opportunity to contribute to open source. This program helps me a ton to get started with open source contributions.

I would like to also thank my mentor, [@cassaundra], for the support of this project, as well as the insightful code reviews and technical direction from [@epage]. Their mentorship was essential to my work in the cargo plumbing efforts.

Finally, I would like to thank the entire Cargo team for providing motivation, moral support, and technical assistance. This experience has been incredibly rewarding, and I am eager to continue contributing to the Rust ecosystem.

## Links
- https://github.com/crate-ci/cargo-plumbing
- https://crates.io/crates/cargo-plumbing
- https://crates.io/crates/cargo-plumbing-schemas

[@secona]: https://github.com/secona
[@cassaundra]: https://github.com/cassaundra
[@epage]: https://github.com/epage
