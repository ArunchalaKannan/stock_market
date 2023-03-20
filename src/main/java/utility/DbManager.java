package utility;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DbManager {
	private static Connection con;
	public Users user;
	private DbManager() {}
	static {
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/stock","mysty","Mysty@2004");
			
		} catch (ClassNotFoundException | SQLException  e) {
			System.out.println("DB connection failed");
			System.exit(0);
		}
		lastStock();
	}
	public static void setStock(int arr[]) {
		try {
			PreparedStatement st = con.prepareStatement("insert into priceRate value(?)");
			st.setString(1, Arrays.toString(arr));
			st.executeUpdate();
		} catch (SQLException  e) {
			System.out.println(e.getMessage());
		}
	}
	public static void setOhl(int arr[],int arr1[],int[] arr2,int[]arr3) {
		try {
			PreparedStatement st = con.prepareStatement("insert into ohl value(?,?,?,?)");
			st.setString(1, Arrays.toString(arr));
			st.setString(2, Arrays.toString(arr1));
			st.setString(3, Arrays.toString(arr2));
			st.setString(4, Arrays.toString(arr3));
			st.executeUpdate();
		} catch (SQLException  e) {
			System.out.println(e.getMessage());
		}
	}
	public static int[] getSpecStock(int i) {
		List<Integer> temp = new ArrayList<Integer>();
		try (PreparedStatement st = con.prepareStatement("select * from priceRate")) {
			ResultSet set = st.executeQuery();
			while(set.next()) {
				String arr[]=set.getString(1).replace("[", "").replace("]", "").replace(" ", "").split(",");
				temp.add(Integer.parseInt(arr[i]));
			}
		} catch (NumberFormatException | SQLException e) {
			e.printStackTrace();
		}
		int[] primitive = temp.stream().mapToInt(Integer::intValue).toArray();
		return primitive;
	}
	public static String getSpecOhl(int i) {
		List<Integer> temp = new ArrayList<Integer>();
		List<Integer> temp1 = new ArrayList<Integer>();
		List<Integer> temp2 = new ArrayList<Integer>();
		List<Integer> temp3 = new ArrayList<Integer>();
		try (PreparedStatement st = con.prepareStatement("select * from ohl")) {
			ResultSet set = st.executeQuery();
			while(set.next()) {
				String arr[]=set.getString(1).replace("[", "").replace("]", "").replace(" ", "").split(",");
				String arr1[]=set.getString(2).replace("[", "").replace("]", "").replace(" ", "").split(",");
				String arr2[]=set.getString(3).replace("[", "").replace("]", "").replace(" ", "").split(",");
				String arr3[]=set.getString(4).replace("[", "").replace("]", "").replace(" ", "").split(",");
				temp.add(Integer.parseInt(arr[i]));
				temp1.add(Integer.parseInt(arr1[i]));
				temp2.add(Integer.parseInt(arr2[i]));
				temp3.add(Integer.parseInt(arr3[i]));
			}
		} catch (NumberFormatException | SQLException e) {
			e.printStackTrace();
		}
		int[] primitive = temp.stream().mapToInt(Integer::intValue).toArray();
		int[] primitive1 = temp1.stream().mapToInt(Integer::intValue).toArray();
		int[] primitive2 = temp2.stream().mapToInt(Integer::intValue).toArray();
		int[] primitive3 = temp3.stream().mapToInt(Integer::intValue).toArray();
		return Arrays.toString(primitive)+"||"+Arrays.toString(primitive1)+"||"+Arrays.toString(primitive2)+"||"+Arrays.toString(primitive3);
	}
	
	public static int[] lastStock() {
		List<Integer> temp = new ArrayList<Integer>();
		String arr[]=null;
		try (PreparedStatement st = con.prepareStatement("select * from priceRate")) {
			ResultSet set = st.executeQuery();
			while(set.next()) {
			arr=set.getString(1).replace("[", "").replace("]", "").replace(" ", "").split(",");
			}
		} catch (NumberFormatException | SQLException e) {
			e.printStackTrace();
		}
		for(int i=0;i<arr.length;i++) {
			temp.add(Integer.parseInt(arr[i]));
		}
		int[] primitive = temp.stream().mapToInt(Integer::intValue).toArray();
		return primitive;
	}
	public static int[] previousStock() {
		List<Integer> temp = new ArrayList<Integer>();
		String arr[]=null;
		boolean previousWasLast = false;
		try (PreparedStatement st = con.prepareStatement("select * from priceRate")) {
			ResultSet set = st.executeQuery();
			while(set.next()) {
				 previousWasLast = set.isLast();
				if (previousWasLast) {
			        // We have reached the data before the last data, so break out of the loop
			        break;
			    }
			arr=set.getString(1).replace("[", "").replace("]", "").replace(" ", "").split(",");
			}
		} catch (NumberFormatException | SQLException e) {
			e.printStackTrace();
		}
		for(int i=0;i<arr.length;i++) {
			temp.add(Integer.parseInt(arr[i]));
		}
		int[] primitive = temp.stream().mapToInt(Integer::intValue).toArray();
		return primitive;
	}
	public static int[] getallStock(String username) {
		List<Integer> temp = new ArrayList<Integer>();
		try (PreparedStatement st = con.prepareStatement("select * from userStock;")) {
			ResultSet set = st.executeQuery();
			
			while(set.next()) {
				if(username.equals(set.getString(1))) {
					String arr[]=set.getString(2).replace("[", "").replace("]", "").replace(" ", "").split(",");
					for(int l=0;l<arr.length;l++) {
						temp.add(Integer.parseInt(arr[l]));
					}
				}
			}
		} catch (NumberFormatException | SQLException e) {
			e.printStackTrace();
		}
		int[] primitive = temp.stream().mapToInt(Integer::intValue).toArray();
		return primitive;
	}
	public static Users getUser(String userName) {
		Users obj = null;
		try (PreparedStatement st = con.prepareStatement("select * from user where BINARY userName=?")) {
			st.setString(1, userName);
			ResultSet set = st.executeQuery();
			
			while(set.next()) {
				obj=new Users(userName,set.getString(2),set.getString(3),set.getString(4),Integer.parseInt(set.getString(5)));
			}
		} catch (NumberFormatException | SQLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return obj;
	}
	public static void addUser(String userName,String password,String name,String gmail,int amount) {
		try {
			PreparedStatement st = con.prepareStatement("insert into user(userName,password,name,gmail,amount) value(BINARY ?,?,?,?,?)");
			st.setString(1, userName);
			st.setString(2, password);
			st.setString(3, name);
			st.setString(4, gmail);
			st.setLong(5, amount);
			st.executeUpdate();
		} catch (SQLException  e) {
			System.out.println(e.getMessage());
		}
	}
	public static void createStock(String userName,Integer stock[]) {
		try {
			PreparedStatement st = con.prepareStatement("insert into userStock value(?,?)");
			st.setString(1, userName);
			st.setString(2, Arrays.toString(stock));
			st.executeUpdate();
		} catch (SQLException  e) {
			System.out.println(e.getMessage());
		}
	}
	public static void updateStock(String userName,int stock[]) {
		try {
			PreparedStatement st = con.prepareStatement("update userStock set stocks = (?) where user = (?)");
			st.setString(1, Arrays.toString(stock));
			st.setString(2, userName);
			st.executeUpdate();
		} catch (SQLException  e) {
			System.out.println(e.getMessage());
		}
	}
	public static void createSession(String session,String userName) {
		try {
			PreparedStatement st = con.prepareStatement("insert into session value(?,?)");
			st.setString(1, session);
			st.setString(2, userName);
			st.executeUpdate();
		} catch (SQLException  e) {
			System.out.println(e.getMessage());
		}
	}
	public static String getSession(String session) {
		try {
			PreparedStatement st = con.prepareStatement("select uName from session where id=?");
			st.setString(1, session);
			ResultSet set = st.executeQuery();
            if(set.next()) {
            	return set.getString(1);
            }
		} catch (SQLException  e) {
			System.out.println(e.getMessage());
		}
		return null;
	}
	public static void deleteSession(String session) {
		try {
			PreparedStatement st = con.prepareStatement("delete from session where id=?");
			st.setString(1, session);
			st.executeUpdate();
		} catch (SQLException  e) {
			System.out.println(e.getMessage());
		}
	}
	
	public static boolean checkName(String userName) {
		try (PreparedStatement st = con.prepareStatement("SELECT * FROM user WHERE BINARY userName =?")) {
			st.setString(1, userName);
			ResultSet set = st.executeQuery();	
			boolean out = set.next();
            return out;

		} catch (NumberFormatException | SQLException e) {
			e.printStackTrace();
			return false;
		}
		
	}
	public static boolean checkGmail(String gmail) {
		try (PreparedStatement st = con.prepareStatement("SELECT * FROM user WHERE BINARY gmail =?")) {
			st.setString(1, gmail);
			ResultSet set = st.executeQuery();	
			boolean out = set.next();
            return out;

		} catch (NumberFormatException | SQLException e) {
			e.printStackTrace();
			return false;
		}
		
	}
	public static void updateAmount(String userName,int amount) {
		try {
			PreparedStatement st = con.prepareStatement("update user set amount = (?) where Binary userName=(?)");
			st.setLong(1, amount);
			st.setString(2, userName);
			st.executeUpdate();
		} catch (SQLException  e) {
			System.out.println(e.getMessage());
		}
	}
	//
}
