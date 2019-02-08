import * as React from 'react';

export class Header extends React.Component<any, any>{
    render() {
        return (
            <nav>
                <ul>
                    <li><a href="#top">Newspaper 21</a></li>
                    <li>
                        <form>
                            <input type="text" placeholder="Add a news topic"
                                autoCorrect="off" autoComplete="off"
                                autoCapitalize="off" spellCheck={false} />
                        </form>
                    </li>
                </ul>
            </nav>
        );
    }
}