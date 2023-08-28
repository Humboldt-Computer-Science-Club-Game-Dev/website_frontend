export default function MaxVignette({
   CustomZIndex,
   tint = 'black',
   opacity = '50%',
}) {
   return (
      <div
         style={{
            position: 'absolute',
            width: '100%',
            height: '101%',
            zIndex: CustomZIndex,
            backgroundColor: tint,
            opacity: opacity,
         }}
         alt='Vignette for site contrast'
      ></div>
   );
}
