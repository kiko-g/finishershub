import boto3
import pandas as pd


def get_s3_uris(bucket_name):
    s3 = boto3.client('s3')
    paginator = s3.get_paginator('list_objects_v2')
    s3_uris = []

    for page in paginator.paginate(Bucket=bucket_name):
        for obj in page.get('Contents', []):
            s3_uris.append(f"s3://{bucket_name}/{obj['Key']}")

    return s3_uris


def save_to_csv(uris, filename=f's3_uris.csv'):
    df = pd.DataFrame(uris, columns=['S3 URI'])
    df.to_csv(filename, index=False)


if __name__ == "__main__":
    bucket_name = 'finishershub.mw2022'
    uris = get_s3_uris(bucket_name)
    save_to_csv(uris, filename=f'{bucket_name}.csv')
