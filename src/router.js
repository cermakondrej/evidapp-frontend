import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        return {x: 0, y: 0}
    },
    routes: [
        {
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('./views/Dashboard.vue'),
                    meta: {
                        rule: 'editor',
                    }
                },
                {
                    path: '/companies',
                    name: 'companies-list',
                    component: () => import('./views/pages/company/CompanyList.vue'),
                    meta: {
                        breadcrumb: [
                            {title: 'Domácí stránka', url: '/'},
                            {title: 'Společnosti', active: true},
                        ],
                        pageTitle: 'Společnosti',
                        rule: 'editor'
                    },
                },
                {
                    path: '/companies/new',
                    name: 'companies-new',
                    component: () => import('./views/forms/company/CompanyNew.vue'),
                    meta: {
                        breadcrumb: [
                            {title: 'Domácí stránka', url: '/'},
                            {title: 'Společnosti', url: '/companies'},
                            {title: 'Nová', active: true},
                        ],
                        pageTitle: 'Nová společnost',
                        rule: 'editor'
                    },
                },
                {
                    path: '/companies/edit/:companyId',
                    name: 'companies-edit',
                    component: () => import('./views/forms/company/CompanyEdit.vue'),
                    meta: {
                        breadcrumb: [
                            {title: 'Domácí stránka', url: '/'},
                            {title: 'Společnosti', url: '/companies'},
                            {title: 'Upravit', active: true},
                        ],
                        pageTitle: 'Upravit společnost',
                        rule: 'editor'
                    },
                },
                {
                    path: '/jobs',
                    name: 'jobs-list',
                    component: () => import('./views/pages/job/JobList.vue'),
                    meta: {
                        breadcrumb: [
                            {title: 'Domácí stránka', url: '/'},
                            {title: 'Pracovní pozice', active: true},
                        ],
                        pageTitle: 'Pracovní pozice',
                        rule: 'editor'
                    },
                },
                {
                    path: '/jobs/new',
                    name: 'jobs-new',
                    component: () => import('./views/forms/job/JobNew.vue'),
                    meta: {
                        breadcrumb: [
                            {title: 'Domácí stránka', url: '/'},
                            {title: 'Pracovní pozice', url: '/jobs'},
                            {title: 'Nová', active: true},
                        ],
                        pageTitle: 'Nová pracovní pozice',
                        rule: 'editor'
                    },
                },
                {
                    path: '/jobs/edit/:jobId',
                    name: 'jobs-edit',
                    component: () => import('./views/forms/job/JobEdit.vue'),
                    meta: {
                        breadcrumb: [
                            {title: 'Domácí stránka', url: '/'},
                            {title: 'Pracovní pozice', url: '/jobs'},
                            {title: 'Upravit', active: true},
                        ],
                        pageTitle: 'Upravit pracovní pozice',
                        rule: 'editor'
                    },
                },
                {
                    path: '/users',
                    name: 'users-list',
                    component: () => import('./views/pages/user/UserList.vue'),
                    meta: {
                        breadcrumb: [
                            {title: 'Domácí stránka', url: '/'},
                            {title: 'Zaměstnanci', active: true},
                        ],
                        pageTitle: 'Zaměstnanci',
                        rule: 'editor'
                    },
                },
                {
                    path: '/users/new',
                    name: 'users-new',
                    component: () => import('./views/forms/user/UserNew.vue'),
                    meta: {
                        breadcrumb: [
                            {title: 'Domácí stránka', url: '/'},
                            {title: 'Zaměstnanci', url: '/users'},
                            {title: 'Nový', active: true},
                        ],
                        pageTitle: 'Nový zaměstnanec',
                        rule: 'editor'
                    },
                },
                {
                    path: '/users/edit/:userId',
                    name: 'users-edit',
                    component: () => import('./views/forms/user/UserEdit.vue'),
                    meta: {
                        breadcrumb: [
                            {title: 'Domácí stránka', url: '/'},
                            {title: 'Zaměstnanci', url: '/users'},
                            {title: 'Upravit', active: true},
                        ],
                        pageTitle: 'Upravit zaměstnance',
                        rule: 'editor'
                    },
                },
                {
                    path: '/works',
                    name: 'works-list',
                    component: () => import('./views/pages/work/WorkList.vue'),
                    meta: {
                        breadcrumb: [
                            {title: 'Domácí stránka', url: '/'},
                            {title: 'Pracovní úvazky', active: true},
                        ],
                        pageTitle: 'Pracovní úvazky',
                        rule: 'editor'
                    },
                },
                {
                    path: '/works/new',
                    name: 'works-new',
                    component: () => import('./views/forms/work/WorkNew.vue'),
                    meta: {
                        breadcrumb: [
                            {title: 'Domácí stránka', url: '/'},
                            {title: 'Pracovní úvazky', url: '/works'},
                            {title: 'Nový', active: true},
                        ],
                        pageTitle: 'Nový pracovní úvazek',
                        rule: 'editor'
                    },
                },
                {
                    path: '/works/edit/:workId',
                    name: 'works-edit',
                    component: () => import('./views/forms/work/WorkEdit.vue'),
                    meta: {
                        breadcrumb: [
                            {title: 'Domácí stránka', url: '/'},
                            {title: 'Pracovní úvazky', url: '/works'},
                            {title: 'Upravit', active: true},
                        ],
                        pageTitle: 'Upravit pracovní úvazek ',
                        rule: 'editor'
                    },
                },
                {
                    path: '/exports/employee/new',
                    name: 'exports-employee-new',
                    component: () => import('./views/exports/EmployeeExport.vue'),
                    meta: {
                        breadcrumb: [
                            {title: 'Domácí stránka', url: '/'},
                            {title: 'Nový pracovní výkaz', active: true},
                        ],
                        pageTitle: 'Nový pracovní výkaz',
                        rule: 'editor'
                    },
                },
                {
                    path: '/exports/variable/new',
                    name: 'exports-variable-new',
                    component: () => import('./views/exports/VariableExport.vue'),
                    meta: {
                        breadcrumb: [
                            {title: 'Domácí stránka', url: '/'},
                            {title: 'Nový pracovní výkaz se směnami', active: true},
                        ],
                        pageTitle: 'Nový pracovní výkaz se směnami',
                        rule: 'editor'
                    },
                },
            ]
        },
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
                {
                    path: '/login',
                    name: 'login',
                    component: () => import('@/views/pages/login/Login.vue'),
                    meta: {
                        rule: 'public'
                    }
                },
                {
                    path: '/forgot-password',
                    name: 'forgot-password',
                    component: () => import('@/views/pages/ForgotPassword.vue'),
                    meta: {
                        rule: 'public'
                    }
                },
                {
                    path: '/reset-password',
                    name: 'reset-password',
                    component: () => import('@/views/pages/ResetPassword.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/page-not-found',
                    name: 'page-not-found',
                    component: () => import('@/views/pages/Error404.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/error-500',
                    name: 'error-500',
                    component: () => import('@/views/pages/Error500.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/not-authorized',
                    name: 'not-authorized',
                    component: () => import('@/views/pages/NotAuthorized.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/maintenance',
                    name: 'maintenance',
                    component: () => import('@/views/pages/Maintenance.vue'),
                    meta: {
                        rule: 'public'
                    }
                },
            ]
        },
        {
            path: '*',
            redirect: '/page-not-found'
        }
    ],
})

router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

export default router
