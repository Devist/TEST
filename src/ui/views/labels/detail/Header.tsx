import React from 'react'
import { Badge } from 'reactstrap'
import { ILabel } from '@src/entities'
import Favorites from '@ui/components/organisms/Favorites'

type Props = { item: ILabel }

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function Header({ item }: Props) {
  console.log(item)
  return (
    <>
      <div className="d-flex full-width">
        <div>
          <h2>{item.description}</h2>
          <div className="font-small-3 text-secondary">{item.name}</div>
          <div className="d-flex">
            {item.hashtags &&
              item.hashtags.map((hashtag) => (
                <Badge
                  key={`hashtag-${hashtag.id}`}
                  color="warning"
                  pill
                  className="company-name mt-little">
                  {hashtag.hashtag}
                </Badge>
              ))}
          </div>
        </div>

        <div className="flex-grow-1" />
        <Favorites
          isTop={item.isTop ? item.isTop : false}
          labelTitle={item.description}
          labelId={item.id}
        />
      </div>
    </>
  )
}

export default Header
