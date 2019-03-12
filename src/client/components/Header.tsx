import * as React from 'react';
import { appendTopicCookie } from '../utils/cookie-util';

interface State {
    inputValue: string;
    showDropdown: boolean;
}
interface Props {
    showOverlay: () => void;
    hideOverlay: () => void;
}

export class Header extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = { inputValue: '', showDropdown: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchFocused = this.searchFocused.bind(this);
        this.searchBlurred = this.searchBlurred.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ ...this.state, inputValue: event.target.value });
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        appendTopicCookie(this.state.inputValue);
        this.setState({ ...this.state, inputValue: '' });
        event.preventDefault();
    }

    searchFocused() {
        this.props.showOverlay();
        this.setState({ ...this.state, showDropdown: true });
    }

    searchBlurred() {
        this.props.hideOverlay();
        this.setState({ ...this.state, showDropdown: false });
    }

    // Note: keeping ul-li for now since that's how apple has it, but they handle reduced screen
    // size differently with a reactive menu, so I may need to diverge from theirs in the future
    render() {
        return (
            <nav id="header">
                <ul>
                    <li><a href="#top">Newspaper 21</a></li>
                </ul>
                <aside>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Add a news topic"
                            autoCorrect="off" autoComplete="off"
                            autoCapitalize="off" spellCheck={false}
                            value={this.state.inputValue} onChange={this.handleChange}
                            onFocus={this.searchFocused} onBlur={this.searchBlurred} />
                    </form>
                    <section className={this.state.showDropdown ? "search-dropdown" : "hidden-dropdown"}>
                        TODO: Results...
                    </section>
                </aside>
            </nav>
        );
    }
}