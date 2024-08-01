This project is done by Team Eaze
 TEAM EAZE
 Name(Roll no.)(Dept.) - Responsibility
 Yatharth Vaish (2000290110196) (CSIT) - Backend & Db
 Sanskar Gupta (2000290310145) (ECE) - Login Authentication and Authorization
 Shivam Mishra (2000290110156) (CSIT) - Frontend
 Shubhang Bhatnagar (2000290110165) (CSIT) - Frontend

all functionalities of the website is working the db is not hosted anywhere to run it in your sytems run this command in you sql

create a database of nam PrimeAutomonile
and then commands


-- Create Users table
CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(100) NOT NULL,
    Password NVARCHAR(100) NOT NULL,
    Role NVARCHAR(50) NOT NULL
);

-- Create Customers table
CREATE TABLE Customers (
    CustomerID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Address NVARCHAR(255),
    ContactNumber NVARCHAR(15)
);

-- Create Vehicles table
CREATE TABLE Vehicles (
    VehicleID INT IDENTITY(1,1) PRIMARY KEY,
    Make NVARCHAR(100) NOT NULL,
    Model NVARCHAR(100) NOT NULL,
    Year INT NOT NULL,
    CustomerID INT,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

-- Create WorkItems table
CREATE TABLE WorkItems (
    WorkItemID INT IDENTITY(1,1) PRIMARY KEY,
    Description NVARCHAR(255) NOT NULL,
    Cost DECIMAL(10, 2) NOT NULL
);

-- Create ServiceRepresentatives table
CREATE TABLE ServiceRepresentatives (
    ServiceRepresentativeID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL
);

-- Create ServiceRecords table
CREATE TABLE ServiceRecords (
    ServiceRecordID INT IDENTITY(1,1) PRIMARY KEY,
    VehicleID INT,
    ServiceRepresentativeID INT,
    ServiceDate DATE NOT NULL,
    Status NVARCHAR(50) NOT NULL,
    FOREIGN KEY (VehicleID) REFERENCES Vehicles(VehicleID),
    FOREIGN KEY (ServiceRepresentativeID) REFERENCES ServiceRepresentatives(ServiceRepresentativeID)
);

-- Create BillOfMaterials table
CREATE TABLE BillOfMaterials (
    BillOfMaterialID INT IDENTITY(1,1) PRIMARY KEY,
    ServiceRecordID INT,
    WorkItemID INT,
    Quantity INT NOT NULL,
    FOREIGN KEY (ServiceRecordID) REFERENCES ServiceRecords(ServiceRecordID),
    FOREIGN KEY (WorkItemID) REFERENCES WorkItems(WorkItemID)
);

-- Create Invoices table
CREATE TABLE Invoices (
    InvoiceID INT IDENTITY(1,1) PRIMARY KEY,
    ServiceRecordID INT,
    InvoiceDate DATE NOT NULL,
    TotalCost DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (ServiceRecordID) REFERENCES ServiceRecords(ServiceRecordID)
);



after running the commands connect your ms sql to vs using connection string configure it in app settings.json in api folder
after that run the vs api project using https you'll get a localhost api tester after that run the fornted after directing yourself in frontend/capstone the in VSC run ng serve -o int the terminal and you'll be good to go
