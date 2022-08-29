import styles from '../../styles/Timeline.module.css'
import Link from 'next/link'
const Timeline = () => {
    return (
        <>
            <Link href='/'>
                <a>Go Home</a>
            </Link>
            <h1 className={styles.title}>This is the timeline</h1>
        </>
    )
}


/* Timeline.getInitialProps = () => {

} */

export default Timeline