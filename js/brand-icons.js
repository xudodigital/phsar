// Phsar's solid glyphs use the same three colour stops as the launch screen.
// Masks preserve true negative space instead of filling the interior of outline icons.
const brandGlyphs={
 store:'<rect x="3" y="9" width="18" height="13" rx="2"/><rect x="5" y="14" width="6" height="5" rx=".8" fill="black"/><path d="M14 14h5v8h-5z" fill="black"/><path d="M2 9h20v3H2z" fill="black"/><path d="M4 2h16l3 5v2c0 3-4.4 3-4.4 0 0 3-4.4 3-4.4 0 0 3-4.4 3-4.4 0 0 3-4.4 3-4.4 0C5.4 12 1 12 1 9V7z"/><path d="m8.2 2-1 5H11V2zm7.6 0 1 5H13V2z" fill="black"/>',

 search:'<path fill-rule="evenodd" d="M10 2a8 8 0 1 0 5 14.25L20.75 22 23 19.75 17.25 14A8 8 0 0 0 10 2Zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"/>',
 camera:'<path d="M8 3h8l2 3h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3z"/><circle cx="12" cy="13" r="4.5" fill="black"/><circle cx="12" cy="13" r="2.6"/>',
 bell:'<path d="M10 2h4v2a7 7 0 0 1 5 7v4l3 3H2l3-3v-4a7 7 0 0 1 5-7zM9 20h6a3 3 0 0 1-6 0Z"/>',
 help:'<circle cx="12" cy="12" r="11"/><path d="M8 8a4 4 0 1 1 6 3.5c-1 .5-2 1-2 3" fill="none" stroke="black" stroke-width="2.6"/><circle cx="12" cy="18" r="1.4" fill="black"/>',
 globe:'<circle cx="12" cy="12" r="10.5"/><ellipse cx="12" cy="12" rx="4.2" ry="10.5" fill="none" stroke="black" stroke-width="1.6"/><path d="M2 9h20M2 15h20" stroke="black" stroke-width="1.6"/>',
 play:'<path d="M7 3a1 1 0 0 1 1.5-.85l13 9a1 1 0 0 1 0 1.7l-13 9A1 1 0 0 1 7 21z"/>',
 pause:'<rect x="5" y="3" width="5" height="18" rx="1.2"/><rect x="14" y="3" width="5" height="18" rx="1.2"/>',
 shield:'<path d="m12 1 10 4v7c0 6-10 11-10 11S2 18 2 12V5z"/><path d="m7 11 3.5 3.5L17 8" fill="none" stroke="black" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>',
 truck:'<path d="M1 4h14v4h4l4 5v6h-2a4 4 0 0 0-8 0h-3a4 4 0 0 0-8 0H1z"/><path d="M16 10h2l3 4h-5z" fill="black"/><circle cx="6" cy="19" r="2.8"/><circle cx="17" cy="19" r="2.8"/>',
 box:'<path d="m12 1 10 5v13l-10 4L2 19V6z"/><path d="m2 6 10 5 10-5M12 11v12M7 3.5l10 5V12" fill="none" stroke="black" stroke-width="1.7"/>',
 bag:'<path d="M3 7h18l1 16H2z"/><path d="M8 9V6a4 4 0 0 1 8 0v3" fill="none" stroke="white" stroke-width="2.5"/><path d="M8 8v2M16 8v2" stroke="black" stroke-width="2"/>',
 brand:'<path d="M3 7h18l1 16H2z"/><path d="M8 8V5a4 4 0 0 1 8 0v3" fill="none" stroke="white" stroke-width="2.5"/><path d="m9 10.5 8 4.5-8 4.5z" fill="black"/>',
 cart:'<path d="M1 1h4l1 4h17l-3 12H6L3 4H1z"/><circle cx="8" cy="21" r="2"/><circle cx="18" cy="21" r="2"/>',
 heart:'<path d="M12 22 3 13C-4 6 5-3 12 5c7-8 16 1 9 8Z"/>',
 comment:'<path d="M12 1C5 1 1 5 1 11c0 3 1 5 3 7l-2 5 7-3c1 .3 2 .4 3 .4 7 0 11-4 11-9.4S19 1 12 1Z"/><g fill="black"><circle cx="7" cy="11" r="1.4"/><circle cx="12" cy="11" r="1.4"/><circle cx="17" cy="11" r="1.4"/></g>',
 share:'<path d="m14 2 10 9-10 9v-6C8 14 4 17 1 22 1 12 5 7 14 7Z"/>',
 home:'<path d="m12 1 12 10h-3v12h-7v-8h-4v8H3V11H0z"/>',
 video:'<path d="M23.5 7a4 4 0 0 0-2.8-2.8C18.8 3.7 12 3.7 12 3.7s-6.8 0-8.7.5A4 4 0 0 0 .5 7 37 37 0 0 0 0 12a37 37 0 0 0 .5 5 4 4 0 0 0 2.8 2.8c1.9.5 8.7.5 8.7.5s6.8 0 8.7-.5a4 4 0 0 0 2.8-2.8 37 37 0 0 0 .5-5 37 37 0 0 0-.5-5Z"/><path d="m9.5 8.3 6.4 3.7-6.4 3.7z" fill="black"/>',
 user:'<circle cx="12" cy="6" r="5"/><path d="M2 23v-3a10 8 0 0 1 20 0v3z"/>',
 back:'<path d="m15 1 3 3-8 8 8 8-3 3L4 12z"/>',
 chevron:'<path d="m9 1-3 3 8 8-8 8 3 3 11-11z"/>',
 close:'<path d="m4 1 8 8 8-8 3 3-8 8 8 8-3 3-8-8-8 8-3-3 8-8-8-8z"/>',
 plus:'<path d="M10 2h4v8h8v4h-8v8h-4v-8H2v-4h8z"/>',
 minus:'<rect x="2" y="10" width="20" height="4" rx="1"/>',
 more:'<circle cx="3" cy="12" r="2.5"/><circle cx="12" cy="12" r="2.5"/><circle cx="21" cy="12" r="2.5"/>',
 shirt:'<path d="M8 3H6.5L1 6.5 3.5 12 6 10.5V21h12V10.5l2.5 1.5L23 6.5 17.5 3H16a4 3 0 0 1-8 0Z"/>',
 beauty:'<rect x="2" y="8" width="9" height="15" rx="1.5"/><path d="M4 1h5v5H4zM15 11h7v12h-7zM16 3h5v6h-5z"/><path d="M2 13h9" stroke="black" stroke-width="1.5"/>',
 headphones:'<path fill-rule="evenodd" d="M1 11a11 11 0 0 1 22 0v9h-7v-9h4a8 8 0 0 0-16 0h4v9H1z"/>',
 cooker:'<rect x="2" y="6" width="20" height="16" rx="4"/><path d="M7 6V3h10v3M0 10h3M21 10h3" fill="none" stroke="white" stroke-width="2.5"/><path d="M5 11h14" stroke="black" stroke-width="1.8"/><circle cx="12" cy="16" r="2" fill="black"/>',
 groceries:'<path d="M1 10h22l-3 13H4zM4 2l4-1 3 8H6zM14 0h4l-2 9h-4zM21 3l3 3-5 3h-2z"/><path d="M8 13v7M16 13v7" stroke="black" stroke-width="1.8"/>',
 sofa:'<path d="M4 10V5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v5h-3v5H7v-5zM0 10h5v7h14v-7h5v11h-2v3h-3v-3H5v3H2v-3H0z"/>',
 music:'<path d="M9 3 23 0v17h-3V7L12 9v11H9z"/><ellipse cx="6" cy="20" rx="6" ry="4"/><ellipse cx="17" cy="17" rx="6" ry="4"/>',
 bolt:'<path d="M14 0 1 14h9L9 24 23 9h-9z"/>',
 battery:'<rect x="1" y="5" width="19" height="15" rx="2"/><path d="M21 9h3v7h-3z"/><path d="m12 7-7 7h5l-1 4 8-8h-5z" fill="black"/>',
 expand:'<path d="M1 1h9v3H4v6H1zM14 1h9v9h-3V4h-6zM23 14v9h-9v-3h6v-6zM10 23H1v-9h3v6h6z"/>',
 star:'<path d="m12 0 3.7 7.5L24 9l-6 6 1.5 9-7.5-4.5L4.5 24 6 15 0 9l8.3-1.5z"/>',
 check:'<circle cx="12" cy="12" r="11"/><path d="m6 12 4 4 8-8" fill="none" stroke="black" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>',
 trash:'<path d="M3 7h18l-1 16H4zM2 3h6V1h8v2h6v3H2z"/><path d="M9 10v10M15 10v10" stroke="black" stroke-width="1.7"/>',
 volume:'<path d="M1 8h5l7-6v20l-7-6H1z"/><path d="M16 7a7 7 0 0 1 0 10M19 3a12 12 0 0 1 0 18" fill="none" stroke="white" stroke-width="2.7"/>',
 muted:'<path d="M1 8h5l7-6v20l-7-6H1zM17 7l3 3 3-3 1 3-2 2 2 2-1 3-3-3-3 3-2-2 3-3-3-3z"/>'
};
let brandIconSequence=0;
function brandIcon(name,cls=''){
 const id=`phsar-icon-${++brandIconSequence}`,glyph=brandGlyphs[name]||brandGlyphs.bag;
 return `<svg class="icon brand-icon ${cls}" data-icon="${name}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><defs><linearGradient id="${id}-paint" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7ba8"/><stop offset=".56" stop-color="#f50750"/><stop offset="1" stop-color="#c30963"/></linearGradient><mask id="${id}-shape" x="0" y="0" width="24" height="24" maskUnits="userSpaceOnUse" style="mask-type:luminance"><g fill="white" stroke="none">${glyph}</g></mask></defs><rect class="brand-icon-ink" width="24" height="24" fill="url(#${id}-paint)" mask="url(#${id}-shape)" stroke="none"/></svg>`;
}
