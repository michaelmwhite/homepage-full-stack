import * as React from 'react';
import { appendTopicCookie, removeTopic } from '../utils/cookie-util';

interface State {
    inputValue: string;
    showDropdown: boolean;
}
interface Props {
    topicsList: string[];
    updateTopicsList: () => void;
}

export class Header extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = { inputValue: '', showDropdown: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showDropdown = this.showDropdown.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ ...this.state, inputValue: event.target.value });
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        appendTopicCookie(this.state.inputValue);
        this.props.updateTopicsList();
        this.setState({ ...this.state, inputValue: '' });
        event.preventDefault();
    }

    showDropdown() {
        this.setState({ ...this.state, showDropdown: true });
    }

    hideDropdown() {
        this.setState({ ...this.state, showDropdown: false });
    }

    render() {
        return (
            <div>
                <nav id="header">
                    <a href="#top">TMAC Newz</a>
                    <aside>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="Add a news topic"
                                autoCorrect="off" autoComplete="off"
                                autoCapitalize="off" spellCheck={false}
                                value={this.state.inputValue} onChange={this.handleChange}
                                onClick={this.showDropdown} />
                        </form>
                        <section className={this.state.showDropdown ? "search-dropdown" : "hidden-dropdown"}>
                            <h3>TOPICS</h3>
                            <ul>
                                {this.props.topicsList.map((topic: string) =>
                                    <li>{topic}
                                        <a onClick={() => {
                                            removeTopic(topic);
                                            this.props.updateTopicsList();
                                        }}
                                        >Remove</a>
                                    </li>
                                )}
                            </ul>
                        </section>
                    </aside>
                </nav>
                <span id={this.state.showDropdown ? "gray-overlay" : null}
                    onClick={this.hideDropdown} />
            </div>
        );
    }
}