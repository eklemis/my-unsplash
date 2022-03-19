BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000),
    CONSTRAINT [User_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [User_email_key] UNIQUE ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Images] (
    [id] NVARCHAR(1000) NOT NULL,
    [url] NVARCHAR(1000) NOT NULL,
    [width] INT NOT NULL,
    [height] INT NOT NULL,
    [userId] INT NOT NULL,
    CONSTRAINT [Images_pkey] PRIMARY KEY ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Images] ADD CONSTRAINT [Images_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
