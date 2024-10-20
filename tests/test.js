const postcss = require('postcss')

const expectedV3 = `
.aspect-h-2 {
    --tw-aspect-h: 2;
}
.aspect-h-\\[123\\] {
    --tw-aspect-h: 123;
}
.aspect-h-\\[var\\(--height\\)\\] {
    --tw-aspect-h: var(--height);
}
.aspect-w-1 {
    position: relative;
    --tw-aspect-ratio: calc(var(--tw-aspect-h) / var(--tw-aspect-w) * 100%);
}
.aspect-w-1::before {
    content: "";
    display: block;
    padding-bottom: var(--tw-aspect-ratio);
}
.aspect-w-1 {
    --tw-aspect-w: 1;
}
.aspect-w-1 > * {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.aspect-w-2 {
    position: relative;
    --tw-aspect-ratio: calc(var(--tw-aspect-h) / var(--tw-aspect-w) * 100%);
}
.aspect-w-2::before {
    content: "";
    display: block;
    padding-bottom: var(--tw-aspect-ratio);
}
.aspect-w-2 {
    --tw-aspect-w: 2;
}
.aspect-w-2 > * {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.aspect-w-\\[123\\] {
    position: relative;
    --tw-aspect-ratio: calc(var(--tw-aspect-h) / var(--tw-aspect-w) * 100%);
}
.aspect-w-\\[123\\]::before {
    content: "";
    display: block;
    padding-bottom: var(--tw-aspect-ratio);
}
.aspect-w-\\[123\\] {
    --tw-aspect-w: 123;
}
.aspect-w-\\[123\\] > * {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.aspect-w-\\[var\\(--width\\)\\] {
    position: relative;
    --tw-aspect-ratio: calc(var(--tw-aspect-h) / var(--tw-aspect-w) * 100%);
}
.aspect-w-\\[var\\(--width\\)\\]::before {
    content: "";
    display: block;
    padding-bottom: var(--tw-aspect-ratio);
}
.aspect-w-\\[var\\(--width\\)\\] {
    --tw-aspect-w: var(--width);
}
.aspect-w-\\[var\\(--width\\)\\] > * {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.aspect-none {
    position: static;
}
.aspect-none::before {
    content: none;
}
.aspect-none > * {
    position: static;
    height: auto;
    width: auto;
    top: auto;
    right: auto;
    bottom: auto;
    left: auto;
}
`

const expectedV2 = `
.aspect-w-1,
.aspect-w-2 {
  position: relative;
  --tw-aspect-ratio: calc(var(--tw-aspect-h) / var(--tw-aspect-w) * 100%);
}

.aspect-w-1::before, .aspect-w-2::before {
  content: "";
  display: block;
  padding-bottom: var(--tw-aspect-ratio);
}

.aspect-w-1 > *,
.aspect-w-2 > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.aspect-none {
  position: static;
}

.aspect-none::before {
  content: none;
}

.aspect-none > * {
  position: static;
  height: auto;
  width: auto;
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
}

.aspect-w-1 {
  --tw-aspect-w: 1;
}

.aspect-w-2 {
  --tw-aspect-w: 2;
}

.aspect-h-2 {
  --tw-aspect-h: 2;
}
`

it('v3', () => {
  return postcss([
    require('tailwindcss')({
      content: [
        {
          raw: 'aspect-none aspect-w-1 aspect-w-2 aspect-h-2 aspect-w-[123] aspect-w-[var(--width)] aspect-h-[123] aspect-h-[var(--height)]',
        },
      ],
      plugins: [require('../')],
    }),
  ])
    .process('@tailwind components', { from: undefined })
    .then(({ css }) => {
      expect(css.trim()).toBe(expectedV3.trim())
    })
})

it('v2', () => {
  return postcss([
    require('tailwindcss-v2')({
      purge: { enabled: true, content: [{ raw: 'aspect-none aspect-w-1 aspect-w-2 aspect-h-2' }] },
      variants: [],
      plugins: [require('../')],
    }),
  ])
    .process('@tailwind components', { from: undefined })
    .then(({ css }) => {
      expect(css.trim()).toBe(expectedV2.trim())
    })
})
