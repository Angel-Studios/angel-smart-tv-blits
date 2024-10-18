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

export default Blits.Component('Box', {
  template: `
    <Element w="300" h="350" color="">
      <Element w="300" h="50" color="blue">
        <Text x="70" y="10" :content="$header" wordwrap="200" />
      </Element>
      <Text y="150" x="80" :content="$text" color="black" wordwrap="200" />
    </Element>
  `,
  props: ['header', 'text'],
})
