export function Header() {
    return (
        <div>
            <section className="hero is-info is-small">
                <div className="hero-body">
                    <div className="title">
                        <h1>string relation ... ?</h1>
                    </div>
                </div>
            </section>
            <div className="section">
                <h2 className="subtitle">how to use</h2>
                <section className="notification">
                    <p className="content is-medium">type text area below. and click "PLUS" button.</p>
                    <p className="content is-medium">if you want to move, click "MOVE" button</p>
                    <p className="content is-medium">
                        when item stop, to click "Edit" button is to edit text
                        <br />
                        and you can connect text box.
                        1.
                    </p>
                    <p className="content is-medium">
                        you can connect text box.
                        <ol>
                            <li>stop item</li>
                            <li>right click on text box to open a menu</li>
                            <li>click "From" in the menu
                            </li>
                            <li>click "To" in the menu
                            </li>
                        </ol>
                    </p>
                </section>
            </div>
        </div>
    )
}

export function Footer() {
    return (
        <footer className="footer ">
            <div className="content has-text-centered is-grey-light">
                <p>use API</p>
                <p>
                    react-movealbe from <a href="https://daybrush.com/moveable/release/latest/doc/">this</a>
                </p>
                <p>
                    react-LeaderLine from <a href="https://anseki.github.io/leader-line/">this</a>
                </p>
                <p>
                    react-contexify from <a href="https://fkhadra.github.io/react-contexify/">this</a>
                </p>
                <p>
                    use css
                </p>
                <p
                >bulma from <a href="https://bulma.io/">this</a>
                </p>
            </div>
        </footer>
    )
}