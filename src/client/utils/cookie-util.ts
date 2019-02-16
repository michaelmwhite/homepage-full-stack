import * as Cookies from 'js-cookie';

export function getTopics() {
    return Cookies.getJSON('topics') || [];
}

export function appendTopicCookie(topic: string) {
    const topicsList = getTopics().concat(topic);
    Cookies.set('topics', topicsList);
    alert(Cookies.getJSON('topics'));
}