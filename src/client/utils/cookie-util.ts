import * as Cookies from 'js-cookie';

export function getTopics() {
    return Cookies.getJSON('topics') || [];
}

export function appendTopicCookie(topic: string) {
    const topicsList = getTopics().concat(topic);
    Cookies.set('topics', topicsList);
}

export function removeTopic(removeTopic: string) {
    const oldTopics = getTopics();
    let newTopics: string[] = [];
    oldTopics.forEach((topic: string) => {
        if (topic !== removeTopic) {
            newTopics.push(topic);
        }
    });
    Cookies.set('topics', newTopics);
}