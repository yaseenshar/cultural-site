export function loadGoogleMapsApi(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).google && (window as any).google.maps) {
      resolve();
      return;
    }

    // Callback for Google Maps script
    (window as any).initMap = () => {
      resolve();
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDD41-EYDMZh3VvmZ9jBowlvCj-8cFerbA&callback=initMap&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
