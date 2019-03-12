import * as React from 'react';
import { appendTopicCookie, getTopics } from '../utils/cookie-util';

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

    render() {
        return (
            <nav id="header">
                <a href="#top">Newspaper 2000</a>
                <aside>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Add a news topic"
                            autoCorrect="off" autoComplete="off"
                            autoCapitalize="off" spellCheck={false}
                            value={this.state.inputValue} onChange={this.handleChange}
                            onFocus={this.searchFocused} onBlur={this.searchBlurred} />
                    </form>
                    <section className={this.state.showDropdown ? "search-dropdown" : "hidden-dropdown"}>
                        <h3>TOPICS</h3>
                        <ul>
                            {getTopics().map((topic: string) => <li>{topic}</li>)}
                        </ul>
                    </section>
                </aside>
            </nav>
        );
    }
}