export const ApiRestComponent = ({children, isPending, isError}) => {
    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error</span>
    }

    return <>{children}</>;
}