export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
        <p>LAYOUT del contact</p>
        {children} 
      
    </div>
  );
}