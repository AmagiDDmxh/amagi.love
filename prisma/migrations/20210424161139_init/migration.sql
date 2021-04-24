-- CreateTable
CREATE TABLE "Quote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "content" TEXT NOT NULL,
    "book" TEXT,
    "author" TEXT NOT NULL,
    "reference" TEXT,
    "viewCount" INTEGER NOT NULL DEFAULT 0
);
