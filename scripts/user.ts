const getUser = (name: string, age: number, email: string) => {
    return {
        name,
        age,
        email
    }
}

const listUsers = [
    getUser('John', 20, 'john@example.com'),
    getUser('Jane', 21, 'jane@example.com'),
    getUser('Jim', 22, 'jim@example.com'),
    getUser('Bakary', 23, 'bakary@example.com'),
]

export { getUser, listUsers }