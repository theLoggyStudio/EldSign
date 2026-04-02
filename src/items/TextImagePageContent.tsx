import type { ReactNode } from 'react'
import { PieceItem } from './PieceReveal'
import { Img } from './Img'
import { ProseWithIcons } from './ProseWithIcons'

type Block =
  | { kind: 'text'; body: string }
  | { kind: 'image'; src: string; alt: string }

type TextImagePageContentProps = {
  blocks: Block[]
  imageFigureClassName?: string
  imageClassName?: string
}

/**
 * Blocs texte / image pour `PieceStagger` : un `PieceItem` par bloc.
 */
export const TextImagePageContent = ({
  blocks,
  imageFigureClassName = 'home-acceuille__figure',
  imageClassName = 'home-acceuille__img',
}: TextImagePageContentProps): ReactNode[] =>
  blocks.map((b, i) =>
    b.kind === 'text' ? (
      <PieceItem key={`t-${i}`}>
            <div className="text-image-prose blo">
              <ProseWithIcons body={b.body} />
            </div>
      </PieceItem>
    ) : (
      <PieceItem key={`i-${i}`}>
        <figure className={imageFigureClassName}>
          <Img className={imageClassName} src={b.src} alt={b.alt} loading="lazy" decoding="async" />
        </figure>
      </PieceItem>
    ),
  )
