function convertPlural(word: string): string {
    if (word.endsWith('y')) {
        return word.slice(0, -1) + 'ies' // 'city' => 'cities'
    } else if (word.endsWith('s') || word.endsWith('x') || word.endsWith('z')) {
        return word + 'es' // 'bus' => 'buses'
    } else {
        return word + 's' // 'dog' => 'dogs'
    }
}

export default convertPlural
