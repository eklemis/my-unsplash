BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Images] ADD [label] NVARCHAR(1000) NOT NULL CONSTRAINT [Images_label_df] DEFAULT '';

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
