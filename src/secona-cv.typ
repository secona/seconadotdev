#let profile = json("content/profile.json").at(0)
#let experiences = json("content/experiences.json")
#let projects = json("content/projects.json")
#let education = json("content/education.json")
#let certifications = json("content/certifications.json")

#set document(author: profile.name, title: profile.name + "'s CV")
#set page(margin: 0.5in, paper: "us-letter")
#set text(font: "New Computer Modern", size: 10pt, lang: "en", ligatures: false)
#show link: underline

#align(center)[
  #text(size: 15pt)[= #profile.name]

  #link("mailto:" + profile.email) |
  #link(profile.linkedin) |
  #link(profile.github) |
  #link(profile.website)
]

#show heading: it => [
  #pad(top: 0pt, bottom: -10pt, [#smallcaps(it.body)])
  #line(length: 100%, stroke: 0.5pt)
]

= Skills

*Skills*: #profile.skills.join(", ") \
*Languages*: #profile.languages.join(", ") \
*Interests*: #profile.interests.join(", ")

= Experiences

#(
  experiences
    .filter(it => it.show)
    .map(
      it => pad(top: 4pt)[
        *#it.title* | _ #link(it.employerUrl)[#it.employer] _ #h(1fr)
        #it.startDate #sym.dash.em #it.endDate \
        #it.description.map(d => [- #d]).join()
      ],
    )
    .join()
)

= Open Source Projects

#(
  projects
    .filter(it => it.show)
    .map(
      it => pad(top: 2pt)[
        *#it.name* | #link(it.url) \
        #it.description.map(d => [- #d]).join()
      ],
    )
    .join()
)

= Education

#(
  education
    .map(
      it => [
        *#it.degree* | _ #it.institution _ #h(1fr)
        #it.startDate #sym.dash.em #it.endDate \
        _Current GPA_: #it.gpa
        #it.courses.map(it => [- #it]).join()
      ],
    )
    .join()
)

= Certifications

#(
  certifications
    .map(
      it => [
        *#it.title* - _ #it.issuer _ #h(1fr) #it.date \
        - #it.description
      ],
    )
    .join()
)
