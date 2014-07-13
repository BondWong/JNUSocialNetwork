package transaction;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import transaction.DAOUpdateTransaction.UpdateAttributeTransaction;
import model.Member;

public class CrawAttributesTransaction implements Transaction{
	Transaction transaction = new UpdateAttributeTransaction();
	private static Pattern p;
	
	@SuppressWarnings("unchecked")
	public Object execute(Object... params) throws Exception {
		// TODO Auto-generated method stub
		String response = (String) params[0];
		Map<String, String> patternMap = (Map<String, String>) params[1];
		String ID = (String) params[2];
		
		p = Pattern.compile(patternMap.get("campusPattern"));
		Matcher m = p.matcher(response);
		String campus = "";
		if(m.find())
			campus = m.group(1).trim();
		
		p = Pattern.compile(patternMap.get("institutionPattern"));
		m = p.matcher(response);
		String institution = "";
		if(m.find())
			institution = m.group(1).trim();
		
		p = Pattern.compile(patternMap.get("namePattern"));
		m = p.matcher(response);
		String name = "";
		if(m.find())
			name = m.group(1).trim();
		
		p = Pattern.compile(patternMap.get("majorPattern"));
		m = p.matcher(response);
		String major = "";
		if(m.find())
			major = m.group(1).trim();
		
		p = Pattern.compile(patternMap.get("genderPattern"));
		m = p.matcher(response);
		String gender = "";
		if(m.find())
			gender = m.group(1).trim();
		
		p = Pattern.compile(patternMap.get("bdayPattern"));
		m = p.matcher(response);
		String year = "";
		String month = "";
		String date = "";
		if(m.find()){
			year = m.group(1).trim();
			month = m.group(2).trim();
			date = m.group(3).trim();
		}
		
		p = Pattern.compile(patternMap.get("telnumPattern"));
		m = p.matcher(response);
		String telnum = "";
		if(m.find())
			telnum = m.group(1).trim();
		
		p = Pattern.compile(patternMap.get("emailPattern"));
		m = p.matcher(response);
		String email = "";
		if(m.find())
			email = m.group(1).trim();
		
		Map<String, String> attributes = new HashMap<String, String>();
		
		attributes.put("campus", campus);
		attributes.put("institution", institution);
		attributes.put("name", name);
		attributes.put("major", major);
		attributes.put("gender", gender);
		attributes.put("year", year);
		attributes.put("month", month);
		attributes.put("date", date);
		attributes.put("telnum", telnum);
		attributes.put("email", email);
		
		System.out.println(params);
		transaction.execute(Member.class, ID, attributes);
		
		return null;
	}

}
