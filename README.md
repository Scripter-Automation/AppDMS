# AppDMS

Createing a database management system for google app scripts. The intention of this proyect is for the user to be able to easily fetch, query and post data to a google app script api. Allowing the user to create multiple databases, tables and permiting full crud functionality. Queries are written similarly to how a SQL query is written, however, mutations are another story.

# Important!
Spreadsheet = Database 
Sheet = Table

Databsaes are selected by passing the ID as a query parameter on the fetch url
All databasdes must have a Main sheet which must be named exactly Main

## Queries

Queries allow the user to extract information from any given table in any given database, in order to make queries one will have to make a fetch with a get method, in which he will have to add the following query parameters

command: Determins which process the doGet method will run once the fetch is attempted.
dataBase: The id of the spreadsheet you want to use as a database
table: The name of the table on string form
queryString: The sql string request you want to perform (This value must contain the format used on they query documentation for google sheets) https://support.google.com/docs/answer/3093343?hl=en

## Mutations

Mutations require the user to make a fetch request using a post method. Which will contain the following options for the body to use.  
primaryKey: The primarykey of the row you want to edit
dataBase: The id of the spreadsheet you want to use as a database in string format
table: The name of the table you want to edit, create or delete in string form
command: The command you want to use
data: The data you want to use to modify a range. Type: number or string or array 
column: Used to edit a single column of a given row
headers: Values to be used as headers on a newly created table
 
 
 ### Commands
