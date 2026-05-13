import Jobs from './Jobs'
import JobsProvider from './context/JobsProvider'

export default function JobsIndex() {
    return (
        <>
            <JobsProvider>
                <Jobs />
            </JobsProvider>
        </>
    )
}
