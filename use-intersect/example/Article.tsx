import React, {useEffect} from 'react'
import styles from './Article.module.scss'
import cn from 'classnames'
import {useIntersect} from "../../hooks/use-intersect";
import {useToggle} from "../../hooks/use-toggle";

export const Article: React.FC = () => {
  const {ref, entry} = useIntersect()
  const {value: visible, turnOn: show} = useToggle(false)

  useEffect(() => {
    if (entry?.intersectionRatio && entry.intersectionRatio > .5)
      show()
  }, [entry.intersectionRatio, show])

  return (
    <div className={cn(styles.article, {[styles.hidden]: !visible})} ref={ref}>
      <h2>Heading</h2>
      <p>Visibility: {Math.round(entry.intersectionRatio * 100) / 100}</p>
      <p>Paragraph: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus explicabo facere fugiat ipsa
        laudantium mollitia necessitatibus nobis porro quasi repellendus. Asperiores cupiditate, ducimus est inventore
        modi molestiae nemo! Consectetur, neque.</p>
    </div>
  )
}