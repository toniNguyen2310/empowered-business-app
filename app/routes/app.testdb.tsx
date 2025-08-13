import type { LoaderFunction } from "@remix-run/node";
import prisma from "../db.server";

export const loader: LoaderFunction = async () => {
    try {
        // Test kết nối Prisma bằng cách lấy tất cả session (giới hạn 5 bản ghi)
        const sessions = await prisma.session.findMany({ take: 5 });

        return new Response(
            `<h1>✅ Kết nối DB thành công!</h1>
       <pre>${JSON.stringify(sessions, null, 2)}</pre>`,
            {
                headers: {
                    "Content-Type": "text/html",
                },
            }
        );
    } catch (error) {
        return new Response(
            `<h1>❌ Lỗi kết nối DB</h1>
       <pre>${String(error)}</pre>`,
            {
                status: 500,
                headers: { "Content-Type": "text/html" },
            }
        );
    }
};
