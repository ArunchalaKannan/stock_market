package utility;

import java.io.IOException;
import java.util.*;

public class Users {
		  public String name;
		  public String userid;
		  public String pass;
		  public String email;
		  public int amount;
		  public HashMap<String,UserStock> map=new HashMap<String,UserStock>();
		   Users(String userid,String pass,String name,String email,int amount) throws IOException{
		        this.userid = userid;
		        this.pass = pass;
		        this.name = name;
		        this.email= email;
		        this.amount=amount;
		        archive();
		     }
		   void archive() {
			   for(int i =0;i<Resource.company.length;i++) {
			   this.map.put(Resource.company[i], new UserStock(Resource.company[i], 0, ""));				   
			   }
		   }
		   public void updatest() {
			   int[] j=DbManager.getallStock(name);
			   map=new HashMap<String,UserStock>();
			   for(int i =0;i<Resource.company.length;i++) {
				   this.map.put(Resource.company[i], new UserStock(Resource.company[i], j[i], ""));				   
				   }
		   }
		  public void update() {
			   int j[]=new  int[30];
			   for(int i=0;i<30;i++) {
				   j[i]=map.get(Resource.company[i]).toInt();
			   }
			   DbManager.updateStock(userid, j);
		   }
		   public String toString() {
			return "UserId : "+userid+"| email : "+email; 
		   }
	}
