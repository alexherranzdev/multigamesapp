import dynamic from 'next/dynamic'
import { useState } from 'react'
import Download from './icons/Download'
import Play from './icons/Play'
import Reload from './icons/Reload'

let video,
  poseNet,
  seq,
  isSomeone = false,
  c,
  n,
  angle,
  marco,
  ml5,
  p5js,
  cnv

export default function SocialFilter({
  filterImage = null,
  marcoImage = null,
  onCapture
}) {
  const STATUSES = {
    NOT_START: null,
    PLAYING: 1,
    STOPPED: 2,
    SAVING: 3
  }

  const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false
  })

  const [status, setStatus] = useState(STATUSES.NOT_START)

  const preload = (p5) => {
    ml5 = require('ml5')
    p5js = p5

    if (marcoImage) {
      marco = p5.loadImage('images/social_marco.png')
    }

    if (filterImage) {
      seq = p5.loadImage(filterImage)
      seq.delay(15)
      seq.pause()
    }
  }

  const setup = (p5, canvasParentRef) => {
    cnv = p5
      .createCanvas(p5.windowWidth, p5.windowHeight)
      .parent(canvasParentRef)

    video = p5.createCapture(p5.VIDEO)
    video.hide()

    if (ml5) {
      poseNet = ml5.poseNet(video)
      poseNet.on('pose', gotPoses)
    }

    c = p5.createVector(0, 0)
    n = p5.createVector(0, 0)
  }

  const draw = (p5) => {
    const videoWidth = (p5.windowHeight * video.width) / video.height
    p5.image(video, -(videoWidth / 2 / 1.5), 0, videoWidth, p5.windowHeight)

    if (marco) {
      p5.image(
        marco,
        (p5.windowWidth - marco.width) / 2,
        (p5.windowHeight - marco.height) / 2
      )
    }

    if (status < STATUSES.SAVING && isSomeone && seq) {
      p5.push()
      p5.translate(
        p5.map(n.x, 0, 640, 0, p5.width) - 320,
        p5.map(n.y, 0, 480, 0, p5.height) - 600
      )

      p5.rotate(angle * 1)
      p5.image(seq, 0, 0)
    }
  }

  const zPos = (x1, y1, x2, y2) => {
    return p5js.dist(x1, y1, x2, y2)
  }

  const gotPoses = (poses) => {
    if (poses.length > 0) {
      isSomeone = true
      n.x = poses[0].pose.keypoints[0].position.x
      n.y = poses[0].pose.keypoints[0].position.y
      midpoint(
        poses[0].pose.keypoints[1].position.x,
        poses[0].pose.keypoints[1].position.y,
        poses[0].pose.keypoints[2].position.x,
        poses[0].pose.keypoints[2].position.y
      )
      angle = n.angleBetween(c)
      zPos(
        poses[0].pose.keypoints[1].position.x,
        poses[0].pose.keypoints[1].position.y,
        poses[0].pose.keypoints[2].position.x,
        poses[0].pose.keypoints[2].position.y
      )
    } else {
      isSomeone = false
    }
  }

  const midpoint = (x1, y1, x2, y2) => {
    c.x = (x1 + x2) / 3
    c.y = (y1 + y2) / 2
  }

  const saveImage = () => {
    setStatus(STATUSES.SAVING)
    onCapture(cnv.canvas.toDataURL('image/jpeg', 5))
  }

  const pauseVideo = () => {
    seq.pause()
    setStatus(STATUSES.STOPPED)
  }

  const stopSequence = () => {
    const rand = Math.round(Math.random() * (3000 - 500)) + 500

    setStatus(STATUSES.PLAYING)
    seq.play()
    seq.reset()
    setTimeout(pauseVideo, rand)
  }

  return (
    <>
      <section className='flex w-full h-full'>
        {typeof window !== 'undefined' && (
          <>
            <Sketch preload={preload} setup={setup} draw={draw} />
          </>
        )}
        {status === STATUSES.NOT_START && (
          <button className='absolute flex items-center justify-center rounded-full bottom-64 left-1/2'>
            <Play fill='#fff' onClick={stopSequence} />
          </button>
        )}
        {(status === STATUSES.STOPPED || status === STATUSES.SAVING) && (
          <>
            <button
              className='absolute flex items-center justify-center rounded-full bottom-64 disabled:opacity-20 disabled:pointer-events-none'
              style={{ left: '35%' }}
              disabled={status === STATUSES.SAVING}
            >
              <Reload fill='#fff' />
            </button>

            <button
              className='absolute flex items-center justify-center rounded-full bottom-64 left-1/2 disabled:opacity-20 disabled:pointer-events-none'
              style={{ left: '65%' }}
              onClick={saveImage}
              disabled={status === STATUSES.SAVING}
            >
              <Download fill='#fff' />
            </button>
          </>
        )}
      </section>
      <style jsx>{`
        section {
          background: #fff;
        }

        button {
          background: #007ac3;
          width: 149px;
          height: 149px;
          color: #fff;
          transform: translateX(-50%);
        }
      `}</style>
    </>
  )
}
