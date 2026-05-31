import Trends from './Trends'
import TrendsProvider from './context/TrendsProvider'

export default function TrendsIndex() {
    return (
        <>
            <TrendsProvider>
                <Trends />
            </TrendsProvider>
        </>
    )
}
