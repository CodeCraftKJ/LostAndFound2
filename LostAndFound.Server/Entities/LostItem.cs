namespace LostAndFound.Server.Entities
{
    public class LostItem
    {
        public int LostItemID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime DateLost { get; set; }
        public int UserID { get; set; }
        public User User { get; set; }
    }
}
