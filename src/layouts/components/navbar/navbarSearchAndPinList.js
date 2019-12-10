export default {
  pages: {
    key: "title",
    data: [
      // DASHBOARDS
      {title: "Dashboard",        url: "/dashboard/",                icon: "HomeIcon",           is_bookmarked: false},

      //
      {title: "Zaměstnanci",              url: "/users",                   icon: "CheckSquareIcon",    is_bookmarked: true},
      {title: "Společnosti",              url: "/companies",               icon: "MessageSquareIcon",  is_bookmarked: true},
      {title: "Pracovní pozice",          url: "/jobs",                    icon: "MailIcon",           is_bookmarked: true},
      {title: "Pracovní úvazky",          url: "/works",                   icon: "CalendarIcon",       is_bookmarked: true},
      {title: "Směnový výkaz",            url: "/exports/variable/new",    icon: "ShoppingCartIcon",   is_bookmarked: true},
      {title: "zaměstnanecký výkaz",      url: "/exports/employee/new",    icon: "SmartphoneIcon",     is_bookmarked: false},

    ]
  },
  files: {
    key:"file_name",
    data: [
      // {file_name: "Joe's CV", from:"Stacy Watson", file_ext:"doc", size:"1.7 mb" },
    ]
  },
  contacts: {
    key:"name",
    data: [
      // {img: require("@/assets/images/portrait/small/avatar-s-4.jpg"), name: "Rena Brant", email: "nephrod@preany.co.uk", time: "21/05/2019"},
    ]
  },
}
