import paths from './assets/json/svg-paths.json'

function ThemeCard() {


    return (
        <div className="theme-card">
            <p>theme #1</p>
            <button>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d={paths.rename[0]} fill="white"/><path fillRule="evenodd" clipRule="evenodd" d={paths.rename[1]} fill="white"/></svg>
            </button>
            <button>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d={paths.rename[0]} fill="white"/><path fillRule="evenodd" clipRule="evenodd" d={paths.rename[1]} fill="white"/></svg>
            </button>
            <button>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d={paths.rename[0]} fill="white"/><path fillRule="evenodd" clipRule="evenodd" d={paths.rename[1]} fill="white"/></svg>
            </button>
        </div>
    )
}

export default ThemeCard