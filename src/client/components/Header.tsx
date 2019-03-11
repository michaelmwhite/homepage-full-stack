import * as React from 'react';
import { appendTopicCookie } from '../utils/cookie-util';

interface State {
    inputValue: string;
}
interface Props {
    showOverlay: () => void;
    hideOverlay: () => void;
}

export class Header extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = { inputValue: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ inputValue: event.target.value });
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        appendTopicCookie(this.state.inputValue);
        this.setState({ inputValue: '' });
        event.preventDefault();
    }

    render() {
        return (
            <nav id="header">
                <ul>
                    <li><a href="#top">Newspaper 21</a></li>
                    <li>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="Add a news topic"
                                autoCorrect="off" autoComplete="off"
                                autoCapitalize="off" spellCheck={false}
                                value={this.state.inputValue} onChange={this.handleChange}
                                onFocus={this.props.showOverlay} onBlur={this.props.hideOverlay} />
                        </form>
                    </li>
                </ul>
            </nav>
        );
    }
}