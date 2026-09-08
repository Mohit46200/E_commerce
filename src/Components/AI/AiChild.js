const AiChild = (old = {}) => {
    return {
        ...old,
        path:"/chat",
        lazy: async () => ({
        Component: (await import("./Ai")).default,
        })
    }

}

export default AiChild;