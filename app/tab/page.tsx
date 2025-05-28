// lets create a new page that uses cursor tab features 
// Import the Link component from Next.js for client-side navigation
import Link from 'next/link';

// Add a button component that links to Cursor's website
// We'll use an anchor tag with button styling since it's an external link
const CursorButton = () => (
    <a 
        href="https://cursor.sh"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
        Visit Cursor Website
    </a>
);

export default function TabPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Cursor Tab Features</h1>
            <p className="text-lg mb-8">
                This page uses cursor tab features to create a tab component.
            </p>
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Tab 1</h2>
                    <p className="text-lg">This is the first tab.</p>
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Tab 2</h2>
                    <p className="text-lg">This is the second tab.</p>
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Tab 3</h2>
                    <p className="text-lg">This is the third tab.</p>
                </div>
            </div>
            <CursorButton />
        </div>
    );
}