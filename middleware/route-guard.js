import { Auth } from 'aws-amplify'

export default function ({ app }) {
  app.router.beforeResolve((to, from, next) => {
    console.log(to)
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      Auth.currentAuthenticatedUser()
        .then(() => {
          next()
        })
        .catch(() => {
          next({
            path: '/authpage',
          })
        })
    } else {
      next()
    }
  })
}
