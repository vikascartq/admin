import Testimonial from './Testimonial'
import TestimonialProvider from './context/TestimonialProvider'

export default function TestimonialIndex() {
    return (
        <>
            <TestimonialProvider>
                <Testimonial />
            </TestimonialProvider>
        </>
    )
}
