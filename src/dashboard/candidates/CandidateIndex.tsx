import Candidate from './Candidate'
import CandidateProvider from './context/CandidateProvider'

export default function CandidateIndex() {
    return (
        <>
            <CandidateProvider>
                <Candidate />
            </CandidateProvider>
        </>
    )
}
