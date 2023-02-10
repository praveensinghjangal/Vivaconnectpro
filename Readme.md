//Please find your assignment below which covers your learnings post RabbitMQ and Mongo DB:-


a.) Upload a CSV file containing (mobile, email, name)
b.) Push metadata of file into RabbitMQ and Mongodb
c.) Fetch file info from RabbitMQ , read file and validate mobile number and insert data into Mongo in chunk size of 1k.


// for uploading csv file to local

destination is used to determine within which folder the uploaded files should be stored. This can also be given as a string (e.g. '/tmp/uploads'). If no destination is given, the operating system's default directory for temporary files is used.

Note: You are responsible for creating the directory when providing destination as a function. When passing a string, multer will make sure that the directory is created for you.

filename is used to determine what the file should be named inside the folder. If no filename is given, each file will be given a random name that doesn't include any file extension.