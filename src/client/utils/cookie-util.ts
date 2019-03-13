import * as Cookies from 'js-cookie';

export function getTopics() {
    return Cookies.getJSON('topics') || [];
}

export function appendTopicCookie(topic: string, updateState: () => void) {
    const topicsList = getTopics().concat(topic);
    Cookies.set('topics', topicsList);
    updateState();
}

export function removeTopic(removeTopic: string, updateState: () => void) {
    const oldTopics = getTopics();
    let newTopics: string[] = [];
    oldTopics.forEach((topic: string) => {
        if (topic !== removeTopic) {
            newTopics.push(topic);
        }
    });
    Cookies.set('topics', newTopics);
    updateState();
}