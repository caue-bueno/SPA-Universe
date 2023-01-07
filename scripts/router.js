export class Router {
    
    
    routes = {}

    add(routeName, path){
        this.routes[routeName] = path    
    }

    route(event) {
        event = event || window.event
        event.preventDefault()

        window.history.pushState({}, "", event.target.href)
        
        this.handle()
    }

    removeClass() {

        const body = document.querySelector('body')
        const home = document.querySelector('#home')
        const universe = document.querySelector('#universe')
        const exploration = document.querySelector('#exploration')

        home.classList.remove('pressed')
        universe.classList.remove('pressed')
        exploration.classList.remove('pressed')
        body.classList.remove('home-bg')
        body.classList.remove('universe-bg')
        body.classList.remove('exploration-bg')
        
    }

    handle() {
        const { pathname } = window.location

        const route = this.routes[pathname] || this.routes[404]

        fetch(route)
        .then(data => data.text())
        .then(html => {

            const body = document.querySelector('body')
            const page = document.querySelector('main')
            const home = document.querySelector('#home')
            const universe = document.querySelector('#universe')
            const exploration = document.querySelector('#exploration')

            this.removeClass()
            if(pathname == home.pathname) {
                home.classList.add('pressed')
                body.classList.add('home-bg')
            }else if(pathname == universe.pathname) {
                universe.classList.add('pressed')
                body.classList.add('universe-bg')
            }else if(pathname == exploration.pathname){
                exploration.classList.add('pressed')
                body.classList.add('exploration-bg')
            }

            page.innerHTML = html

        })
    }
}