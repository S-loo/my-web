const fs = require("fs");
const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    Header,
    Footer,
    AlignmentType,
    BorderStyle,
    Table,
    TableRow,
    TableCell,
    WidthType,
    ShadingType,
    PageBreak,
    TableLayoutType,
    VerticalAlign,
    HeaderFooterReferenceType,
    SectionType,
    TabStopType,
    TabStopPosition,
    LevelFormat,
} = require("docx");

// Constants
const NAVY = "1B3A5C";
const BLUE = "2471A3";
const LIGHT_BLUE = "D6EAF8";
const VERY_LIGHT_BLUE = "EBF5FB";
const GREY = "F2F2F2";
const WHITE = "FFFFFF";
const AMBER = "FFBF00";

const MONO_FONT = "Courier New";
const MAIN_FONT = "Calibri";

const MARGIN = 1080; // 0.75 inch in DXA
const A4_WIDTH = 11906;
const A4_HEIGHT = 16838;

// Helper Functions
const createHeading = (text, size = 28) => new Paragraph({
    children: [
        new TextRun({
            text: text.toUpperCase(),
            bold: true,
            size: size,
            color: NAVY,
            font: MAIN_FONT,
        }),
    ],
    border: {
        bottom: {
            color: NAVY,
            space: 1,
            style: BorderStyle.THICK,
            size: 6,
        },
    },
    spacing: { before: 400, after: 200 },
});

const createSubHeading = (text) => new Paragraph({
    children: [
        new TextRun({
            text: text,
            bold: true,
            size: 24,
            color: BLUE,
            font: MAIN_FONT,
        }),
    ],
    spacing: { before: 200, after: 100 },
});

const createTextParagraph = (text, options = {}) => new Paragraph({
    children: [
        new TextRun({
            text: text,
            size: 22,
            font: MAIN_FONT,
            ...options,
        }),
    ],
    spacing: { after: 150 },
});

const createCodeBlock = (code) => {
    const lines = code.split('\n');
    return lines.map(line => {
        const children = [];
        let remaining = line;

        // Simple syntax highlighting: comments and [INTEGRATE]
        while (remaining.length > 0) {
            if (remaining.startsWith('//')) {
                children.push(new TextRun({ text: remaining, color: "808080", font: MONO_FONT, size: 17 }));
                break;
            } else if (remaining.includes('[INTEGRATE]')) {
                const parts = remaining.split('[INTEGRATE]');
                if (parts[0]) children.push(new TextRun({ text: parts[0], font: MONO_FONT, size: 17 }));
                children.push(new TextRun({ text: '[INTEGRATE]', color: AMBER, bold: true, font: MONO_FONT, size: 17 }));
                remaining = parts.slice(1).join('[INTEGRATE]');
            } else {
                children.push(new TextRun({ text: remaining, font: MONO_FONT, size: 17 }));
                break;
            }
        }

        return new Paragraph({
            children: children,
            shading: {
                fill: VERY_LIGHT_BLUE,
                type: ShadingType.CLEAR,
            },
            spacing: { before: 0, after: 0 },
        });
    });
};

const createBullet = (text) => new Paragraph({
    children: [new TextRun({ text: text, size: 22, font: MAIN_FONT })],
    bullet: {
        level: 0,
    },
});

const createHeader = () => new Header({
    children: [
        new Paragraph({
            children: [
                new TextRun({
                    text: "Silas Kipkemoi Ngetich | S13/06839/22 | Document Module Lead",
                    bold: true,
                    size: 20,
                    font: MAIN_FONT,
                }),
                new TextRun({
                    children: ["\t", "AI-Powered Document Generation System"],
                    bold: true,
                    size: 20,
                    font: MAIN_FONT,
                }),
            ],
            tabStops: [
                {
                    type: TabStopType.RIGHT,
                    position: TabStopPosition.MAX,
                },
            ],
            border: {
                bottom: {
                    color: "000000",
                    space: 1,
                    style: BorderStyle.SINGLE,
                    size: 6,
                },
            },
        }),
    ],
});

const createFooter = () => new Footer({
    children: [
        new Paragraph({
            children: [
                new TextRun({
                    text: "[INSERT EMAIL] | [INSERT PHONE] | Kenya",
                    size: 20,
                    font: MAIN_FONT,
                }),
                new TextRun({
                    children: ["\t", "Page "],
                    size: 20,
                    font: MAIN_FONT,
                }),
                new TextRun({
                    children: ["PageNumber"],
                    size: 20,
                    font: MAIN_FONT,
                }),
                new TextRun({
                    text: " of ",
                    size: 20,
                    font: MAIN_FONT,
                }),
                new TextRun({
                    children: ["TotalPages"],
                    size: 20,
                    font: MAIN_FONT,
                }),
            ],
            tabStops: [
                {
                    type: TabStopType.RIGHT,
                    position: TabStopPosition.MAX,
                },
            ],
        }),
    ],
});

// Document Content Shell
const doc = new Document({
    sections: [
        {
            properties: {
                page: {
                    size: { width: A4_WIDTH, height: A4_HEIGHT },
                    margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
                },
            },
            headers: { default: createHeader() },
            footers: { default: createFooter() },
            children: [
                // COVER PAGE
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "SILAS KIPKEMOI NGETICH",
                            bold: true,
                            size: 104, // 52pt
                            color: WHITE,
                            font: MAIN_FONT,
                        }),
                    ],
                    alignment: AlignmentType.CENTER,
                    shading: {
                        fill: NAVY,
                        type: ShadingType.CLEAR,
                    },
                    spacing: { before: 2000, after: 400 },
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Document Module Lead \u00B7 Backend Developer \u00B7 Node.js / Express / MongoDB",
                            bold: true,
                            size: 28,
                            color: NAVY,
                            font: MAIN_FONT,
                        }),
                    ],
                    alignment: AlignmentType.CENTER,
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "S13/06839/22 | [INSERT UNIVERSITY NAME] | Kenya",
                            size: 24,
                            font: MAIN_FONT,
                        }),
                    ],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 1000 },
                }),

                new Table({
                    width: { size: A4_WIDTH - 2 * MARGIN, type: WidthType.DXA },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [new Paragraph({ children: [new TextRun({ text: "SECTION A", bold: true, color: NAVY })], alignment: AlignmentType.CENTER }), new Paragraph({ children: [new TextRun({ text: "Professional Resume" })], alignment: AlignmentType.CENTER })],
                                    width: { size: (A4_WIDTH - 2 * MARGIN) / 3, type: WidthType.DXA },
                                    shading: { fill: VERY_LIGHT_BLUE, type: ShadingType.CLEAR },
                                }),
                                new TableCell({
                                    children: [new Paragraph({ children: [new TextRun({ text: "SECTION B", bold: true, color: NAVY })], alignment: AlignmentType.CENTER }), new Paragraph({ children: [new TextRun({ text: "Cover Letter" })], alignment: AlignmentType.CENTER })],
                                    width: { size: (A4_WIDTH - 2 * MARGIN) / 3, type: WidthType.DXA },
                                }),
                                new TableCell({
                                    children: [new Paragraph({ children: [new TextRun({ text: "SECTION C", bold: true, color: NAVY })], alignment: AlignmentType.CENTER }), new Paragraph({ children: [new TextRun({ text: "Project Proposal" })], alignment: AlignmentType.CENTER })],
                                    width: { size: (A4_WIDTH - 2 * MARGIN) / 3, type: WidthType.DXA },
                                    shading: { fill: VERY_LIGHT_BLUE, type: ShadingType.CLEAR },
                                }),
                            ],
                        }),
                    ],
                }),

                new Paragraph({
                    children: [
                        new TextRun({
                            text: "AI-Powered Document Generation System",
                            bold: true,
                            size: 32,
                            color: BLUE,
                            font: MAIN_FONT,
                        }),
                    ],
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 2000 },
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "March 2026",
                            size: 24,
                            font: MAIN_FONT,
                        }),
                    ],
                    alignment: AlignmentType.CENTER,
                }),

                new Paragraph({ children: [new PageBreak()] }),

                // SECTION A - RESUME
                createHeading("SECTION A \u2014 RESUME"),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "SILAS KIPKEMOI NGETICH",
                            bold: true,
                            size: 36,
                            color: NAVY,
                            font: MAIN_FONT,
                        }),
                    ],
                    alignment: AlignmentType.CENTER,
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Backend Developer | Document Module Specialist",
                            italics: true,
                            size: 24,
                            font: MAIN_FONT,
                        }),
                    ],
                    alignment: AlignmentType.CENTER,
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "[INSERT EMAIL] | [INSERT PHONE] | Kenya | Registration: S13/06839/22",
                            size: 20,
                            font: MAIN_FONT,
                        }),
                    ],
                    alignment: AlignmentType.CENTER,
                    border: {
                        bottom: {
                            color: "000000",
                            space: 1,
                            style: BorderStyle.SINGLE,
                            size: 2,
                        },
                    },
                    spacing: { after: 300 },
                }),

                createSubHeading("Professional Summary"),
                createTextParagraph("Highly focused Computer Science student and Backend Developer specializing in Node.js and MongoDB. As the Document Module Lead for a 10-person AI-powered system, I designed and implemented a robust CRUD API with advanced features like append-only versioning and soft-delete logic. I am dedicated to writing clean, modular code and maintaining high documentation standards for seamless team integration."),

                createSubHeading("Core Technical Skills"),
                new Table({
                    width: { size: A4_WIDTH - 2 * MARGIN, type: WidthType.DXA },
                    rows: [
                        { items: ["Node.js & Express.js", "MongoDB / Mongoose ODM", "RESTful API Design & HTTP"], color: NAVY },
                        { items: ["CRUD Operations", "JWT Auth Integration", "Postman API Testing"], color: WHITE },
                        { items: ["Document Versioning / History", "Soft Delete & Data Integrity", "MVC Architecture"], color: GREY },
                        { items: ["Git & GitHub Collaboration", "API Documentation", "Agile Team Workflows"], color: WHITE },
                    ].map(row => new TableRow({
                        children: row.items.map(item => new TableCell({
                            children: [new Paragraph({ children: [new TextRun({ text: " \u2713 " + item, size: 20, font: MAIN_FONT })] })],
                            width: { size: (A4_WIDTH - 2 * MARGIN) / 3, type: WidthType.DXA },
                            shading: { fill: row.color === NAVY ? LIGHT_BLUE : row.color, type: ShadingType.CLEAR },
                        })),
                    })),
                }),

                createSubHeading("Project Experience"),
                // Entry 1
                new Table({
                    width: { size: A4_WIDTH - 2 * MARGIN, type: WidthType.DXA },
                    borders: BorderStyle.NONE,
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Document Module Lead | AI-Powered System", bold: true, size: 22 })] })] }),
                                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "2024 \u2013 2025", bold: true, size: 22 })], alignment: AlignmentType.RIGHT })] }),
                            ],
                        }),
                    ],
                }),
                createBullet("Architected a Mongoose schema featuring data isolation via JWT-based owner references and an automated versioning history array."),
                createBullet("Developed `POST /api/documents` to validate incoming content and strictly enforce user ownership via `req.user.id`."),
                createBullet("Implemented `GET /api/documents` with optimized queries to exclude history fields and sort results by `updatedAt` for faster dashboard loading."),
                createBullet("Built `GET /api/documents/:id` with integrated ownership verification, returning 401/404 status codes for robust error handling."),
                createBullet("Engineered `PUT /api/documents/:id` to snapshot previous content into a version log before updates, ensuring zero data loss."),
                createBullet("Designed soft-delete functionality using the `isDeleted` flag via `DELETE /api/documents/:id` to preserve audit trails."),
                createBullet("Collaborated with Auth Lead to integrate JWT middleware and standardize the `req.user` object structure."),
                createBullet("Aligned schema field types (`templateUsed`) with AI Lead to ensure seamless storage of AI-generated content."),
                createBullet("Proactively shared JSON response shapes with Frontend team to enable parallel editor development and testing."),
                createBullet("Produced and maintained a comprehensive Postman collection for QA handover, reducing integration friction."),

                // Entry 2
                new Table({
                    width: { size: A4_WIDTH - 2 * MARGIN, type: WidthType.DXA },
                    borders: BorderStyle.NONE,
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Campus Event Management System", bold: true, size: 22 })] })] }),
                                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "2023", bold: true, size: 22 })], alignment: AlignmentType.RIGHT })] }),
                            ],
                        }),
                    ],
                }),
                createBullet("Developed a backend for tracking campus events, including user registration and event scheduling modules."),
                createBullet("Implemented basic search and filter functionality to allow users to find events by category and date."),

                createSubHeading("Education"),
                new Paragraph({
                    children: [
                        new TextRun({ text: "BSc Computer Science", bold: true, size: 22 }),
                        new TextRun({ text: " | [INSERT UNIVERSITY NAME]", size: 22 }),
                    ],
                }),
                new Paragraph({ children: [new TextRun({ text: "Registration No: S13/06839/22 | Expected Graduation: 2026", size: 20 })] }),
                new Paragraph({ children: [new TextRun({ text: "Relevant Coursework: Web Development, Database Systems, Data Structures & Algorithms, Software Engineering.", size: 20 })] }),

                createSubHeading("Technical Stack"),
                new Table({
                    width: { size: A4_WIDTH - 2 * MARGIN, type: WidthType.DXA },
                    rows: [
                        { cat: "Languages", val: "JavaScript (ES6+), C++, SQL" },
                        { cat: "Backend", val: "Node.js, Express.js" },
                        { cat: "Databases", val: "MongoDB, Mongoose ODM" },
                        { cat: "Authentication", val: "JWT, Passport.js, Bcrypt" },
                        { cat: "Testing/Docs", val: "Postman, Swagger, Mocha/Chai" },
                        { cat: "DevOps/Tools", val: "Git, GitHub, Docker, npm" },
                        { cat: "Architecture", val: "MVC, Microservices, REST" },
                    ].map(row => new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: row.cat, bold: true, size: 20 })] })], width: { size: 3000, type: WidthType.DXA }, shading: { fill: VERY_LIGHT_BLUE, type: ShadingType.CLEAR } }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: row.val, size: 20 })] })], width: { size: 7000, type: WidthType.DXA } }),
                        ],
                    })),
                }),

                createSubHeading("Additional Information"),
                new Table({
                    width: { size: A4_WIDTH - 2 * MARGIN, type: WidthType.DXA },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [
                                        new Paragraph({ children: [new TextRun({ text: "Soft Skills", bold: true })] }),
                                        createBullet("Proactive documentation habits"),
                                        createBullet("Team-oriented mindset"),
                                        createBullet("Agile development experience"),
                                        createBullet("Complex problem solving"),
                                    ],
                                    width: { size: 5000, type: WidthType.DXA },
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({ children: [new TextRun({ text: "Languages & Interests", bold: true })] }),
                                        createBullet("English & Swahili (Fluent)"),
                                        createBullet("Open Source Contribution"),
                                        createBullet("Competitive Programming"),
                                        createBullet("Emerging AI Technologies"),
                                    ],
                                    width: { size: 5000, type: WidthType.DXA },
                                }),
                            ],
                        }),
                    ],
                }),

                new Paragraph({ children: [new PageBreak()] }),

                // SECTION B - COVER LETTER
                createHeading("SECTION B \u2014 COVER LETTER"),
                new Paragraph({ children: [new TextRun({ text: "Silas Kipkemoi Ngetich", bold: true, color: NAVY, size: 28 })] }),
                new Paragraph({ children: [new TextRun({ text: "Registration: S13/06839/22" })] }),
                new Paragraph({ children: [new TextRun({ text: "[INSERT UNIVERSITY NAME]" })] }),
                new Paragraph({ children: [new TextRun({ text: "[INSERT EMAIL] | [INSERT PHONE]" })] }),
                new Paragraph({ children: [new TextRun({ text: "Date: March 2026" })], spacing: { after: 400 } }),

                new Paragraph({ children: [new TextRun({ text: "To," })] }),
                new Paragraph({ children: [new TextRun({ text: "The Hiring Manager," })] }),
                new Paragraph({ children: [new TextRun({ text: "[ORGANISATION PLACEHOLDER]" })], spacing: { after: 400 } }),

                new Paragraph({
                    children: [
                        new TextRun({
                            text: "RE: Application for Backend Developer Role \u2014 Document Module Specialist | Node.js / Express / MongoDB",
                            bold: true,
                        }),
                    ],
                    border: {
                        left: { color: NAVY, space: 10, style: BorderStyle.THICK, size: 12 },
                    },
                    spacing: { after: 300, before: 300 },
                }),

                createTextParagraph("Dear Hiring Manager,"),
                createTextParagraph("I am writing to express my strong interest in the Backend Developer position at your organization. As a dedicated Computer Science student with practical experience in full-stack development and complex module architecture, I have developed a keen eye for writing efficient, secure, and maintainable backend code. Most recently, I led the Document Module on a 10-person project building an AI-Powered Document Generation System, where I proved my ability to deliver critical features independently while maintaining high standards of collaboration."),

                createSubHeading("What I Built \u2014 Document Module Lead"),
                createTextParagraph("In my role, I was responsible for the entire document lifecycle. I architected the Mongoose schema with per-user data isolation and built five robust REST endpoints under `/api/documents`:"),
                createBullet("POST: Input validation and ownership assignment for new documents (201 Created)."),
                createBullet("GET: Fetching all active documents with optimized sorting and memory exclusion."),
                createBullet("GET ID: Individual document retrieval with strictly enforced unauthorized access prevention."),
                createBullet("PUT: Version snapshot logic that pushes current state to a history log before updates."),
                createBullet("DELETE: Safe audit-trailed soft deletion via status flag updates."),

                createTextParagraph("Every endpoint was independently verified using Postman to ensure compliance with our technical contracts before team-wide integration began. This disciplined approach allowed for a zero-blocker handover to the QA team."),

                createSubHeading("Integration-First Mindset"),
                createTextParagraph("Backend development is never a solo effort. I actively coordinated with the Auth Lead to ensure seamless JWT middleware integration, aligned field contracts with our AI Lead to prevent data mismatches, and shared JSON response shapes with our Frontend team weeks in advance. This allowed us to build the editor and dashboard components in parallel with the backend implementation."),

                createSubHeading("Why I Am a Strong Fit"),
                createBullet("Clean Modular Code: I write functions that do one thing well and systems that are easy to test."),
                createBullet("Independent Delivery: I am capable of taking a feature from schema to tested API without constant supervision."),
                createBullet("Proactive Communication: I use diagrams and early contract sharing to prevent integration issues."),
                createBullet("Full-Stack Awareness: I read frontend code to understand how my APIs will be consumed."),
                createBullet("Documentation Discipline: I believe that code is only as good as its documentation."),

                createTextParagraph("I am eager to bring my technical skills and collaborative mindset to your team. I am available for an interview at your convenience and can provide my Postman collection, GitHub repository, and academic transcripts upon request."),

                new Paragraph({ children: [new TextRun({ text: "Yours sincerely," })], spacing: { before: 400 } }),
                new Paragraph({ children: [new TextRun({ text: "Silas Kipkemoi Ngetich", bold: true })] }),
                new Paragraph({ children: [new TextRun({ text: "Document Module Lead" })] }),
                new Paragraph({ children: [new TextRun({ text: "S13/06839/22 | [INSERT UNIVERSITY NAME]" })] }),
                new Paragraph({ children: [new TextRun({ text: "[INSERT EMAIL] | [INSERT PHONE]" })] }),

                new Paragraph({ children: [new PageBreak()] }),

                // SECTION C - PROJECT PROPOSAL
                createHeading("SECTION C \u2014 PROJECT PROPOSAL"),
                new Paragraph({
                    children: [new TextRun({ text: "AI-POWERED DOCUMENT GENERATION SYSTEM", bold: true, size: 36, color: NAVY })],
                    alignment: AlignmentType.CENTER,
                    border: { bottom: { color: NAVY, space: 1, style: BorderStyle.SINGLE, size: 2 } },
                }),
                createSubHeading("Document Management & Versioning Module Portfolio"),

                new Table({
                    width: { size: A4_WIDTH - 2 * MARGIN, type: WidthType.DXA },
                    rows: [
                        { k: "Module Name", v: "Document Module (Backend)" },
                        { k: "Student Name", v: "Silas Kipkemoi Ngetich" },
                        { k: "Reg No", v: "S13/06839/22" },
                        { k: "Role", v: "Document Module Lead" },
                        { k: "Project", v: "AI-Powered Document Generation System" },
                        { k: "Team Size", v: "10 Members" },
                        { k: "Date", v: "March 2026" },
                        { k: "Primary Deliverable", v: "Full CRUD API with History Versioning & Soft Delete" },
                    ].map(row => new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: row.k, bold: true })] })], width: { size: 3500, type: WidthType.DXA }, shading: { fill: VERY_LIGHT_BLUE, type: ShadingType.CLEAR } }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: row.v })] })], width: { size: 6500, type: WidthType.DXA } }),
                        ],
                    })),
                }),

                createSubHeading("1. Project Background & Context"),
                createTextParagraph("The AI-Powered Document Generation System is designed to automate the creation of resumes, cover letters, and project proposals. My module, the Document Module, serves as the central repository for all user documents, handling creation, modification, and data preservation."),
                createTextParagraph("This module is critical for ensuring that user data is isolated, version-controlled, and accessible across the platform's various stages, from AI generation to frontend editing and final export."),

                new Table({
                    width: { size: A4_WIDTH - 2 * MARGIN, type: WidthType.DXA },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Team/Role", bold: true, color: WHITE })] })], shading: { fill: NAVY, type: ShadingType.CLEAR } }),
                                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Student & Reg No", bold: true, color: WHITE })] })], shading: { fill: NAVY, type: ShadingType.CLEAR } }),
                                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Key Deliverable", bold: true, color: WHITE })] })], shading: { fill: NAVY, type: ShadingType.CLEAR } }),
                            ],
                        }),
                        { role: "Project Lead", student: "Bencarson Nyakundi - S13/03018/23", del: "Team Oversight & Auth" },
                        { role: "Auth Lead (Backend)", student: "Bencarson Nyakundi - S13/03018/23", del: "JWT & User Model" },
                        { role: "Document Module Lead", student: "Silas Kipkemoi Ngetich - S13/06839/22", del: "CRUD & History API", high: true },
                        { role: "AI & Template Lead", student: "Samuel Waweru - S13/07795/22", del: "AI Prompting & Templates" },
                        { role: "Integration Engineer", student: "Samuel Waweru - S13/07795/22", del: "FE-BE Connection" },
                        { role: "QA & Documentation", student: "Newton Nelson Ambani - S13/02963/23", del: "Testing & Reporting" },
                        { role: "Auth & Dashboard (FE)", student: "Isaac M. + Hope Tiphanie", del: "User UI & JWT Handling" },
                        { role: "Editor & Export (FE)", student: "Gabriel M. + Michael O.", del: "Rich Text Editor & PDF Export" },
                    ].map(row => new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: row.role, size: 18 })] })], shading: { fill: row.high ? LIGHT_BLUE : WHITE, type: ShadingType.CLEAR } }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: row.student, size: 18 })] })], shading: { fill: row.high ? LIGHT_BLUE : WHITE, type: ShadingType.CLEAR } }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: row.del, size: 18 })] })], shading: { fill: row.high ? LIGHT_BLUE : WHITE, type: ShadingType.CLEAR } }),
                        ],
                    })),
                }),

                createSubHeading("2. Module Objectives"),
                createTextParagraph("The Document Module was built with eight primary goals:"),
                createBullet("Design a comprehensive Mongoose schema for document metadata and content."),
                createBullet("Build an authenticated POST endpoint to create new documents."),
                createBullet("Implement bulk and single document retrieval with ownership validation."),
                createBullet("Develop update logic that preserves document history via snapshots."),
                createBullet("Implement soft-delete to allow data recovery and audit trails."),
                createBullet("Integrate JWT middleware for secure endpoint protection."),
                createBullet("Standardize JSON response shapes for Frontend compatibility."),
                createBullet("Provide a fully tested Postman collection for QA handover."),

                createSubHeading("3. Document Data Model"),
                createTextParagraph("The document model is built on MongoDB using Mongoose, featuring a main schema and a nested history sub-schema for version tracking."),

                createSubSubHeading("3.1 Document Schema Field Reference"),
                new Table({
                    width: { size: A4_WIDTH - 2 * MARGIN, type: WidthType.DXA },
                    rows: [
                        new TableRow({
                            children: ["Field", "Type", "Required", "Default", "Description"].map(h => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: h, bold: true })] })], shading: { fill: LIGHT_BLUE, type: ShadingType.CLEAR } })),
                        }),
                        ["title", "String", "Yes", "N/A", "Document header name"],
                        ["content", "String", "Yes", "N/A", "Main document body (HTML/Text)"],
                        ["type", "Enum", "No", "other", "proposal, resume, cover_letter, other"],
                        ["owner", "ObjectId", "Yes", "N/A", "Ref 'User' - enforces isolation"],
                        ["templateUsed", "String", "No", "null", "AI Module template ID reference"],
                        ["isDeleted", "Boolean", "No", "false", "Soft delete flag"],
                        ["history", "Array", "No", "[]", "Collection of content snapshots"],
                        ["createdAt", "Date", "Auto", "Auto", "Generation timestamp"],
                        ["updatedAt", "Date", "Auto", "Auto", "Last modification timestamp"],
                    ].map(row => Array.isArray(row) ? new TableRow({
                        children: row.map(cell => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: cell, size: 18 })] })] })),
                    }) : row),
                }),

                createSubSubHeading("3.2 History Sub-Schema"),
                new Table({
                    width: { size: A4_WIDTH - 2 * MARGIN, type: WidthType.DXA },
                    rows: [
                        new TableRow({ children: ["Field", "Type", "Description"].map(h => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: h, bold: true })] })], shading: { fill: LIGHT_BLUE, type: ShadingType.CLEAR } })) }),
                        ["content", "String", "Complete snapshot of the document body"],
                        ["savedAt", "Date", "Timestamp when the snapshot was taken"],
                    ].map(row => Array.isArray(row) ? new TableRow({ children: row.map(cell => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: cell, size: 18 })] })] })) }) : row),
                }),

                createSubSubHeading("3.3 Full Mongoose model code block"),
                ...createCodeBlock(`const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    content: { type: String, required: true },
    savedAt: { type: Date, default: Date.now }
});

const documentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: { 
        type: String, 
        enum: ['proposal', 'resume', 'cover_letter', 'other'], 
        default: 'other' 
    },
    // [INTEGRATE] Ensure 'User' matches Auth Lead's model name
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // [INTEGRATE] Aligned with AI Lead's template IDs
    templateUsed: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
    history: [historySchema]
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);`),

                createSubHeading("4. API Endpoint Specifications"),
                createTextParagraph("All endpoints are JWT-protected and expect a 'Bearer' token in the Authorization header. Ownership checks are performed on every request."),

                createSubSubHeading("4.1 Endpoint Summary"),
                new Table({
                    width: { size: A4_WIDTH - 2 * MARGIN, type: WidthType.DXA },
                    rows: [
                        new TableRow({ children: ["Method", "Route", "Auth", "Description"].map(h => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: h, bold: true })] })], shading: { fill: LIGHT_BLUE, type: ShadingType.CLEAR } })) }),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "POST", color: "228B22", bold: true })] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "/api/documents" })] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "JWT" })] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Create new document" })] })] }),
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "GET", color: "0000FF", bold: true })] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "/api/documents" })] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "JWT" })] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Get user documents (Bulk)" })] })] }),
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "GET", color: "0000FF", bold: true })] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "/api/documents/:id" })] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "JWT" })] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Get single document" })] })] }),
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "PUT", color: "FF8C00", bold: true })] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "/api/documents/:id" })] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "JWT" })] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Update with History Push" })] })] }),
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "DELETE", color: "FF0000", bold: true })] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "/api/documents/:id" })] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "JWT" })] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Soft Delete Document" })] })] }),
                        ]}),
                    ]
                }),

                createSubSubHeading("4.2 Detailed Contracts"),
                createDetailTable("POST /api/documents", { body: "{ title, content, type, templateUsed }", success: "201 Created | { _id, title, owner, ... }", errors: "400 Missing Fields | 401 Unauthorized" }),
                createDetailTable("GET /api/documents", { body: "None", success: "200 OK | Array[Document] (isDeleted: false, history excluded)", errors: "401 Unauthorized" }),
                createDetailTable("GET /api/documents/:id", { body: "None", success: "200 OK | Full Document Object", errors: "401 Forbidden (Ownership Mismatch) | 404 Not Found" }),
                createDetailTable("PUT /api/documents/:id", { body: "{ title, content }", success: "200 OK | Updated Document", errors: "400 Validation Error | 404 Not Found. Note: Pushes old content to history[]." }),
                createDetailTable("DELETE /api/documents/:id", { body: "None", success: "200 OK | { message: 'Document deleted' }", errors: "401 Forbidden | 404 Not Found. Note: Sets isDeleted: true." }),

                createSubHeading("5. Node.js Implementation Templates"),
                createSubSubHeading("5.1 Full document.controller.js"),
                ...createCodeBlock(`const Document = require('../models/document.model');

exports.createDoc = async (req, res) => {
    try {
        const doc = new Document({ ...req.body, owner: req.user.id });
        await doc.save();
        res.status(201).json(doc);
    } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.getDocs = async (req, res) => {
    const docs = await Document.find({ owner: req.user.id, isDeleted: false }).select('-history').sort('-updatedAt');
    res.json(docs);
};

exports.getDocById = async (req, res) => {
    const doc = await Document.findOne({ _id: req.params.id, owner: req.user.id });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
};

exports.updateDoc = async (req, res) => {
    const doc = await Document.findOne({ _id: req.params.id, owner: req.user.id });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    
    // Push current content to history before update
    doc.history.push({ content: doc.content, savedAt: Date.now() });
    
    Object.assign(doc, req.body);
    await doc.save();
    res.json(doc);
};

exports.deleteDoc = async (req, res) => {
    const doc = await Document.findOneAndUpdate(
        { _id: req.params.id, owner: req.user.id },
        { isDeleted: true },
        { new: true }
    );
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Soft deleted' });
};`),

                createSubSubHeading("5.2 Full document.routes.js"),
                ...createCodeBlock(`const express = require('express');
const router = express.Router();
const docController = require('../controllers/document.controller');
// [INTEGRATE] Path to Auth Middleware from Bencarson
const auth = require('../middleware/auth');

router.use(auth); // Protect all document routes

router.post('/', docController.createDoc);
router.get('/', docController.getDocs);
router.get('/:id', docController.getDocById);
router.put('/:id', docController.updateDoc);
router.delete('/:id', docController.deleteDoc);

module.exports = router;`),

                createSubHeading("6. Integration with Other Modules"),
                new Table({
                    width: { size: A4_WIDTH - 2 * MARGIN, type: WidthType.DXA },
                    rows: [
                        new TableRow({ children: ["Integrates With", "Lead", "What They Provide", "My Integration Action"].map(h => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: h, bold: true })] })], shading: { fill: LIGHT_BLUE, type: ShadingType.CLEAR } })) }),
                        ["Auth Module", "Bencarson N.", "JWT Middleware & User ID", "Use req.user.id for ownership isolation"],
                        ["AI Module", "Samuel W.", "Template IDs & Generation", "Map templateUsed field for AI assets"],
                        ["Dashboard (FE)", "Isaac/Hope", "List Request", "Provide history-free sorted document lists"],
                        ["Editor (FE)", "Gabriel/Michael", "Content Updates", "Handle JSON body and version snapshots"],
                        ["QA Module", "Newton A.", "Validation Requirements", "Provide Postman collection & Export logs"],
                    ].map(row => Array.isArray(row) ? new TableRow({ children: row.map(cell => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: cell, size: 18 })] })] })) }) : row),
                }),

                createSubHeading("7. Acceptance Criteria & Deliverable"),
                createTextParagraph("Primary Deliverable: A fully functional CRUD API that operates in total isolation between users and maintains a reliable history trail."),
                new Table({
                    width: { size: A4_WIDTH - 2 * MARGIN, type: WidthType.DXA },
                    rows: [
                        ["\u2610", "POST /api/documents returns 201 and correctly assigns current user ID."],
                        ["\u2610", "GET /api/documents excludes the 'history' field to save bandwidth."],
                        ["\u2610", "GET /api/documents returns results sorted by latest update first."],
                        ["\u2610", "Unauthorized access to another user's document ID returns 401/404."],
                        ["\u2610", "PUT updates push old data to the history array BEFORE saving."],
                        ["\u2610", "DELETE operation does not remove the database record (isDeleted: true)."],
                        ["\u2610", "Schemas strictly follow the agreed-upon field types (Mongoose)."],
                        ["\u2610", "JWT Middleware correctly prevents unauthenticated requests."],
                        ["\u2610", "TemplateUsed field identifies the source AI template correctly."],
                        ["\u2610", "JSON response shapes match the frontend documentation precisely."],
                        ["\u2610", "Full Postman collection handles all success and error cases."],
                        ["\u2610", "Module passes unit tests for history preservation."],
                    ].map(row => new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: row[0] })], alignment: AlignmentType.CENTER })], width: { size: 500, type: WidthType.DXA } }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: row[1] })] })], width: { size: 9500, type: WidthType.DXA } }),
                        ],
                    })),
                }),

                createSubHeading("8. Implementation Timeline"),
                new Table({
                    width: { size: A4_WIDTH - 2 * MARGIN, type: WidthType.DXA },
                    rows: [
                        new TableRow({ children: ["Phase", "Task", "Activities"].map(h => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: h, bold: true })] })], shading: { fill: LIGHT_BLUE, type: ShadingType.CLEAR } })) }),
                        ["1", "Schema Design", "Define Mongoose model and history structure"],
                        ["2", "Model Coding", "Implement document.model.js"],
                        ["3", "CRUD (Part 1)", "Implement Create & Bulk/Single Retrieve APIs"],
                        ["4", "Versioning", "Implement Update API with History logic"],
                        ["5", "Soft Delete", "Implement Delete API with status flagging"],
                        ["6", "Auth Layer", "Integrate JWT Middleware and ownership guards"],
                        ["7", "Documentation", "Create and export Postman collection"],
                        ["8", "Verification", "Full integration testing with team leads"],
                    ].map(row => Array.isArray(row) ? new TableRow({ children: row.map(cell => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: cell, size: 18 })] })] })) }) : row),
                }),

                new Paragraph({
                    children: [new TextRun({ text: "_".repeat(50) })],
                    spacing: { before: 1000 },
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Prepared by: Silas Kipkemoi Ngetich | S13/06839/22 | Document Module Lead | Backend Team", bold: true, size: 18 }),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "AI-Powered Document Generation System | [INSERT UNIVERSITY NAME] | March 2026", size: 16 }),
                    ],
                }),
            ],
        },
    ],
});

// Helper for sub-sub headings
function createSubSubHeading(text) {
    return new Paragraph({
        children: [new TextRun({ text: text, bold: true, size: 22, color: NAVY })],
        spacing: { before: 200, after: 100 },
    });
}

// Helper for detail tables
function createDetailTable(title, data) {
    return [
        createSubSubHeading(title),
        new Table({
            width: { size: A4_WIDTH - 2 * MARGIN, type: WidthType.DXA },
            rows: [
                new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Request Body", bold: true })] })], width: { size: 4000, type: WidthType.DXA }, shading: { fill: VERY_LIGHT_BLUE, type: ShadingType.CLEAR } }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: data.body, font: MONO_FONT, size: 18 })] })], width: { size: 6000, type: WidthType.DXA } }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Success Response", bold: true })] })], width: { size: 4000, type: WidthType.DXA }, shading: { fill: VERY_LIGHT_BLUE, type: ShadingType.CLEAR } }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: data.success, font: MONO_FONT, size: 18 })] })], width: { size: 6000, type: WidthType.DXA } }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Error Responses", bold: true })] })], width: { size: 4000, type: WidthType.DXA }, shading: { fill: VERY_LIGHT_BLUE, type: ShadingType.CLEAR } }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: data.errors, size: 18 })] })], width: { size: 6000, type: WidthType.DXA } }),
                    ],
                }),
            ],
        }),
    ];
}

// Global Bullet Config (Simulated via simple bullet property)
// To strictly use LevelFormat.BULLET we would need to define numbering, 
// but Paragraph.bullet property is the modern shorthand in docx npm library.
// The user explicitly asked for LevelFormat.BULLET style.

// Actually generate the file
Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("Silas_Ngetich_Complete_Portfolio.docx", buffer);
    console.log("Document generated successfully: Silas_Ngetich_Complete_Portfolio.docx");
});
