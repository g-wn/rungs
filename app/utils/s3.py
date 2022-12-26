import boto3
import botocore
import os
import uuid


# BUCKET NAME AND URL:
BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"

# LIST OF FILE TYPES ALLOWED TO BE UPLOADED:
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "svg", "pdf"}

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("S3_KEY"),
    aws_secret_access_key=os.environ.get("S3_SECRET"),
)


# ------------------------- FILENAME HELPERS ------------------------- #


# RETURN TRUE IF FILE ENDS IN ACCEPTED FILETYPE AND IS FORMATTED CORRECTLY, ELSE FALSE:
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# CREATE A UNIQUE FILE NAME TO AVOID COLLISIONS/OVERWRITE:
def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


# --------------------------- UPLOAD HELPERS -------------------------- #


# UPLOAD THE FILE TO THE BUCKET:
def upload_to_bucket(file, acl="public-read"):
    try:
        print("------------------ FILE ------------------", file)
        print("------------------ FILENAME IS STRING? ------------------", isinstance(file.filename, str))
        print("------------------ BUCKET_NAME IS STRING? ------------------", isinstance(BUCKET_NAME, str))
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={"ACL": acl, "ContentType": file.content_type},
        )
    except Exception as e:
        # CATCH A FAILED S3 UPLOAD
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}
