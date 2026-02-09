export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass p-8 w-full max-w-md" data-variant="panel">
                {children}
            </div>
        </div>
    );
}
