/*
 * Copyright 2023 Comcast Cable Communications Management, LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import Blits from '@lightningjs/blits'

export default Blits.Component('FPScounter', {
  template: `
    <Element y="15" x="20">
      <Element>
        <Sprite image="assets/fps_sprite.png"w="43" h="25" map="$sprite" frame="fps" />
        <Element x="58" y="2">
          <Sprite image="assets/fps_sprite.png" x="0" h="20" w="20" map="$sprite" :frame="$fps[0]" />
          <Sprite image="assets/fps_sprite.png" x="18" h="20" w="20" map="$sprite" :frame="$fps[1]" />
          <Sprite image="assets/fps_sprite.png" x="36" h="20" w="20" map="$sprite" :frame="$fps[2]" />
        </Element>
      </Element>

      <Element x="150">
        <Sprite image="assets/fps_sprite.png" y="2" w="48" h="25" map="$sprite" frame="avg" />
        <Element x="63" y="2">
          <Sprite image="assets/fps_sprite.png" x="0" h="20" w="20" map="$sprite" :frame="$avgFps[0]" />
          <Sprite image="assets/fps_sprite.png" x="18" h="20" w="20" map="$sprite" :frame="$avgFps[1]" />
          <Sprite image="assets/fps_sprite.png" x="36" h="20" w="20" map="$sprite" :frame="$avgFps[2]" />
        </Element>
      </Element>


      <Element x="0" y="40" >
        <Sprite image="assets/fps_sprite.png" x="-2" w="47" h="25" map="$sprite" frame="min" />
        <Element x="58" y="2">
          <Sprite image="assets/fps_sprite.png" x="0" h="20" w="20" map="$sprite" :frame="$minFps[0]" />
          <Sprite image="assets/fps_sprite.png" x="18" h="20" w="20" map="$sprite" :frame="$minFps[1]" />
          <Sprite image="assets/fps_sprite.png" x="36" h="20" w="20" map="$sprite" :frame="$minFps[2]" />
        </Element>
      </Element>


      <Element x="150" y="40">
        <Sprite image="assets/fps_sprite.png" w="53" h="25" map="$sprite" frame="max" />
        <Element x="63" y="2">
          <Sprite image="assets/fps_sprite.png" x="0" h="20" w="20" map="$sprite" :frame="$maxFps[0]" />
          <Sprite image="assets/fps_sprite.png" x="18" h="20" w="20" map="$sprite" :frame="$maxFps[1]" />
          <Sprite image="assets/fps_sprite.png" x="36" h="20" w="20" map="$sprite" :frame="$maxFps[2]" />
        </Element>
      </Element>
    </Element>
    `,
  state() {
    return {
      sprite: {
        defaults: {
          y: 1,
          w: 20,
          h: 20,
        },
        frames: {
          false: { x: -1000 },
          0: { x: 1 },
          1: { x: 23 },
          2: { x: 45 },
          3: { x: 67 },
          4: { x: 89 },
          5: { x: 111 },
          6: { x: 133 },
          7: { x: 155 },
          8: { x: 177 },
          9: { x: 199 },
          avg: { x: 221, w: 48, h: 25 },
          fps: { x: 271, w: 43, h: 25 },
          max: { x: 316, w: 53, h: 25 },
          min: { x: 371, w: 47, h: 25 },
        },
      },
      fps: '-',
      avgFps: '-',
      minFps: '-',
      maxFps: '-',
    }
  },
  hooks: {
    init() {
      const times = []
      let fps = 0
      let minFps = 10000
      let maxFps = 0
      let avgFps = 0
      let totalFps = 0
      let totalFrames = 0
      let lastUpdate = performance.now()

      const refreshLoop = () => {
        window.requestAnimationFrame(() => {
          const now = performance.now()

          if (minFps < 10000 && lastUpdate <= now - 1000) {
            lastUpdate = now
            this.fps = fps.toString().padStart(3, '0')
            this.avgFps = avgFps.toString().padStart(3, '0')
            this.minFps = minFps.toString().padStart(3, '0')
            this.maxFps = maxFps.toString().padStart(3, '0')
          }

          while (times.length > 0 && times[0] <= now - 1000) {
            times.shift()
          }
          times.push(now)

          fps = times.length

          if (totalFrames > 60) {
            minFps = Math.min(fps, minFps)
            maxFps = Math.max(fps, maxFps)
            totalFps += fps
            avgFps = Math.round(totalFps / (totalFrames - 60))
          }
          totalFrames++

          refreshLoop()
        })
      }

      refreshLoop()
    },
  },
})
