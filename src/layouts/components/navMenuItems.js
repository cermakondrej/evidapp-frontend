export default [

  {
    url: '/',
    name: "Dashboard",
    slug: 'dashboard',
    icon: "HomeIcon",
  },
  {
    header: "Zaměstnanci",
    icon: "UsersIcon",
    items: [
      {
        url: '/users',
        name: "Seznam zaměstnanců",
        slug: "users-list",
        icon: "MenuIcon",
      },
      {
        url: '/users/new',
        name: "Nový zaměstnanec",
        slug: "users-new",
        icon: "PlusIcon",
      }
    ]
  },
  {
    header: "Společnosti",
    icon: "DatabaseIcon",
    items: [
      {
        url: '/companies',
        name: "Seznam společností",
        slug: "companies-list",
        icon: "MenuIcon",
      },
      {
        url: '/companies/new',
        name: "Nová společnost",
        slug: "companies-new",
        icon: "PlusIcon",
      }
    ]
  },
  {
    header: "Pracovní pozice",
    icon: "BriefcaseIcon",
    items: [
      {
        url: '/jobs',
        name: "Seznam pozic",
        slug: "jobs-list",
        icon: "MenuIcon",
      },
      {
        url: '/jobs/new',
        name: "Nová pozice",
        slug: "jobs-new",
        icon: "PlusIcon",
      }
    ]
  },
  {
    header: "Pracovní úvazky",
    icon: "ArchiveIcon",
    items: [
      {
        url: '/works',
        name: "Seznam úvazků",
        slug: "works-list",
        icon: "MenuIcon",
      },
      {
        url: '/works/new',
        name: "Nový úvazek",
        slug: "works-new",
        icon: "PlusIcon",
      }
    ]
  },
  {
    header: "Pracovní výkazy",
    icon: "ArchiveIcon",
    items: [
      {
        url: '/exports/employee/new',
        name: "Zaměstnanecký výkaz",
        slug: "exports-employee-new",
        icon: "MenuIcon",
      },
      {
        url: '/exports/variable/new',
        name: "Směnový výkaz",
        slug: "exports-variable-new",
        icon: "PlusIcon",
      }
    ]
  },
]

